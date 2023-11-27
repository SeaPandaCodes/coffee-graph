import { books } from "./data/books";
import { drinks } from "./data/drinks";

export const resolvers = {
  Query: {
    books: () => books,
    drinks: () => drinks,
  },
};
