import { Database, OPEN_READWRITE } from "sqlite3";
import { drinks } from "../data/drinks";
import { books } from "../data/books";

export const db = new Database("./src/database.db", OPEN_READWRITE, (err) => {
  if (err) console.log(err);
});

export function setupDB() {
  db.serialize(() => {
    db.run(`
    begin;
    DROP TABLE IF EXISTS books;
    DROP TABLE IF EXISTS drinks;
    commit;
    `);

    db.run(`
    CREATE TABLE IF NOT EXISTS books(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(100) NOT NULL,
      author VARCHAR(100) NOT NULL,
      image VARCHAR(100),
      description TEXT NOT NULL,
      genre TEXT[] NOT NULL,
      season TEXT[] NOT NULL,
      vibe TEXT[] NOT NULL
    )
    `);

    const insertBooks = db.prepare(`
    INSERT INTO books(
      title,
      author,
      image,
      description,
      genre,
      season,
      vibe)
      VALUES (?,?,?,?,?,?,?)
    `);

    books.forEach((book) => {
      insertBooks.run(
        book.title,
        book.author,
        book.image,
        book.description,
        JSON.stringify(book.genre),
        JSON.stringify(book.season),
        JSON.stringify(book.vibe)
      );
    });

    insertBooks.finalize();

    db.run(`
    CREATE TABLE IF NOT EXISTS drinks(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type VARCHAR(50) NOT NULL,
      name VARCHAR(100) NOT NULL,
      season TEXT[] NOT NULL,
      vibe TEXT[] NOT NULL
      )`);

    const insertDrinks = db.prepare(`
    INSERT INTO drinks
      (type, name, season,vibe) VALUES
      (?,?,?,?)`);

    drinks.map((drink) => {
      insertDrinks.run(
        drink.type,
        drink.name,
        JSON.stringify(drink.season),
        JSON.stringify(drink.vibe)
      );
    });

    insertDrinks.finalize();
  });
}
