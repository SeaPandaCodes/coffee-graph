import { ContextValue } from ".";
import { Book, Drink, Genre, Moods, Seasons } from "./data/dataTypes";

export const resolvers = {
  Query: {
    books: async (_, __, ctx: ContextValue) => {
      const result: Array<Book> = [];
      const drinkRes = await ctx.db.all(`SELECT * FROM books`);

      for (const row of drinkRes) {
        const moodsRes: Array<{ mood: Moods }> = await ctx.db.all(
          `SELECT mood FROM moods WHERE item_id = ?`,
          [row.id]
        );
        result.push({
          id: row.id,
          title: row.title,
          author: row.author,
          image: row.image,
          description: row.description,
          genre: JSON.parse(row.genre) as Array<Genre>,
          season: JSON.parse(row.season) as Array<Seasons>,
          mood: moodsRes.map((x) => x.mood),
        });
      }
      return result;
    },
    drinks: async (_, __, ctx: ContextValue) => {
      const result: Array<Drink> = [];
      const drinkRes = await ctx.db.all(`SELECT * FROM drinks`);

      for (const row of drinkRes) {
        const moodRes = await ctx.db.all(
          `SELECT mood FROM moods WHERE item_id = ?`,
          [row.id]
        );
        result.push({
          id: row.id,
          name: row.name,
          season: JSON.parse(row.season) as Array<Seasons>,
          type: row.type,
          mood: moodRes.map((x) => x.mood) as Array<Moods>,
        });
      }

      return result;
    },
    booksByMood: async (_, { mood }, ctx: ContextValue) => {
      const result: Array<Book> = [];
      const booksRes = await ctx.db.all(
        `
        SELECT * FROM moods
          WHERE type = 'book' AND
            mood = ?
      `,
        [mood]
      );

      for (const row of booksRes) {
        const bookDetails = await ctx.db.all(
          `
          SELECT * FROM books
          WHERE id = ?
        `,
          [row.item_id]
        );
        const book = bookDetails[0];
        result.push({
          id: book.id,
          title: book.title,
          author: book.author,
          image: book.image,
          description: book.description,
          genre: JSON.parse(book.genre) as Array<Genre>,
          season: JSON.parse(book.season) as Array<Seasons>,
          mood: [row.mood] as Array<Moods>,
        });
      }

      return result;
    },
    booksBySubject: async (_, { subject }, ctx: ContextValue) => {
      return await ctx.libraryAPI.getBooksBySubject(subject);
    },
  },
};
