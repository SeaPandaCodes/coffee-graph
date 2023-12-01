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

    CREATE TABLE IF NOT EXISTS books(
      id VARCHAR(50) PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      author VARCHAR(100) NOT NULL,
      image VARCHAR(100),
      description TEXT NOT NULL,
      genre TEXT[] NOT NULL,
      season TEXT[] NOT NULL,
      vibe TEXT[] NOT NULL
    );

    CREATE TABLE IF NOT EXISTS drinks(
      id VARCHAR(50) PRIMARY KEY,
      type VARCHAR(50) NOT NULL,
      name VARCHAR(100) NOT NULL,
      season TEXT[] NOT NULL,
      vibe TEXT[] NOT NULL
    );
    commit;
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
      vibe
    ) VALUES (?,?,?,?,?,?,?,?)
    `);

  books.forEach(async (book) => {
    await insertBooks.run(
      crypto.randomBytes(8).toString("hex"),
      book.title,
      book.author,
      book.image,
      book.description,
      JSON.stringify(book.genre),
      JSON.stringify(book.season),
      JSON.stringify(book.vibe)
    );
  });

  await insertBooks.finalize();

  const insertDrinks = await db.prepare(`
    INSERT INTO drinks (
      id,
      type,
      name,
      season,
      vibe
    ) VALUES (?,?,?,?,?)
  `);

  drinks.forEach(async (drink) => {
    await insertDrinks.run(
      crypto.randomBytes(8).toString("hex"),
      drink.type,
      drink.name,
      JSON.stringify(drink.season),
      JSON.stringify(drink.vibe)
    );
  });

  await insertDrinks.finalize();
  const result = await db.all(`SELECT * FROM drinks`);
  console.log(result);
  return db;
}
