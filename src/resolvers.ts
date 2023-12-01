import { ContextValue } from ".";
import { Book, Drink } from "./data/dataTypes";

export const resolvers = {
  Query: {
    books: async (_, __, ctx: ContextValue) => {
      const result: Array<Book> = [];
      const drinkRes = await ctx.db.all(`SELECT * FROM books`);
      drinkRes.forEach((row) => {
        result.push({
          id: row.id,
          title: row.title,
          author: row.author,
          image: row.image,
          description: row.description,
          genre: JSON.parse(row.genre),
          season: JSON.parse(row.season),
          vibe: JSON.parse(row.vibe),
        });
      });

      return result;
    },
    drinks: async (_, __, ctx: ContextValue) => {
      const result: Array<Drink> = [];
      const drinkRes = await ctx.db.all(`SELECT * FROM drinks`);
      drinkRes.forEach((row) => {
        result.push({
          id: row.id,
          name: row.name,
          season: JSON.parse(row.season),
          type: row.type,
          vibe: JSON.parse(row.vibe),
        });
      });

      return result;
    },
  },
};
