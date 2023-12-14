import { drinks } from "../data/drinks";
import { books } from "../data/books";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import crypto from "node:crypto";

export async function setupDB() {
  const db = await open({
    filename: "./src/database.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    begin;
    DROP TABLE IF EXISTS books;
    DROP TABLE IF EXISTS drinks;
    DROP TABLE IF EXISTS moods;

    CREATE TABLE IF NOT EXISTS books(
      id VARCHAR(50) PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      author VARCHAR(100) NOT NULL,
      image VARCHAR(100),
      description TEXT NOT NULL,
      genre TEXT[] NOT NULL,
      season TEXT[] NOT NULL,
      mood TEXT[] NOT NULL
    );

    CREATE TABLE IF NOT EXISTS drinks(
      id VARCHAR(50) PRIMARY KEY,
      type VARCHAR(50) NOT NULL,
      name VARCHAR(100) NOT NULL,
      season TEXT[] NOT NULL,
      mood TEXT[] NOT NULL
    );

    CREATE TABLE IF NOT EXISTS moods(
      id VARCHAR(50) PRIMARY KEY,
      item_id VARCHAR(50) NOT NULL,
      type VARCHAR(50) NOT NULL,
      mood VARCHAR(100) NOT NULL
    );

    commit;
  `);

  const insertMoods = await db.prepare(`
      INSERT INTO moods(
        id,
        item_id,
        type,
        mood
      ) VALUES (?,?,?,?)
  `);

  const insertBooks = await db.prepare(`
    INSERT INTO books(
      id,
      title,
      author,
      image,
      description,
      genre,
      season,
      mood
    ) VALUES (?,?,?,?,?,?,?,?)
    `);

  books.forEach(async (book) => {
    const itemId = crypto.randomBytes(8).toString("hex");
    await insertBooks.run(
      itemId,
      book.title,
      book.author,
      book.image,
      book.description,
      JSON.stringify(book.genre),
      JSON.stringify(book.season),
      JSON.stringify(book.mood)
    );
    book.mood.forEach(async (mood) => {
      await insertMoods.run(
        crypto.randomBytes(8).toString("hex"),
        itemId,
        "book",
        mood
      );
    });
  });

  await insertBooks.finalize();

  const insertDrinks = await db.prepare(`
    INSERT INTO drinks (
      id,
      type,
      name,
      season,
      mood
    ) VALUES (?,?,?,?,?)
  `);

  drinks.forEach(async (drink) => {
    const itemId = crypto.randomBytes(8).toString("hex");
    await insertDrinks.run(
      itemId,
      drink.type,
      drink.name,
      JSON.stringify(drink.season),
      JSON.stringify(drink.mood)
    );
    drink.mood.forEach(async (mood) => {
      insertMoods.run(
        crypto.randomBytes(8).toString("hex"),
        itemId,
        "drink",
        mood
      );
    });
  });

  await insertDrinks.finalize();
  await insertMoods.finalize();

  return db;
}
