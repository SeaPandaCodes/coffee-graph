import { ContextValue } from ".";
import { Book, Drink } from "./data/dataTypes";

export const resolvers = {
  Query: {
    books: async (_, __, ctx: ContextValue) => {
      const result: Array<Book> = [];
      const drinkRes = await ctx.db.all(`SELECT * FROM books`);

      for (const row of drinkRes) {
        const moodsRes = await ctx.db.all(
          `SELECT mood FROM moods WHERE item_id = ?`,
          [row.id]
        );
        result.push({
          id: row.id,
          title: row.title,
          author: row.author,
          image: row.image,
          description: row.description,
          genre: JSON.parse(row.genre),
          season: JSON.parse(row.season),
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
          season: JSON.parse(row.season),
          type: row.type,
          mood: moodRes.map((x) => x.mood),
        });
      }

      return result;
    },
  },
};
