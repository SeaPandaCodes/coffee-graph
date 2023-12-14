import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { setupDB } from "./utils/setupDB";
import { Database } from "sqlite";
import { LibraryAPI } from "./utils/openLibraryAPI";

export type ContextValue = {
  db: Database;
  libraryAPI: LibraryAPI;
};

async function main() {
  const db = await setupDB();

  const server = new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
        db,
        libraryAPI: new LibraryAPI(),
      };
    },
  });
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);

  // bookScraper(
  //   "removed to avoid copyright issues :( "
  // );
}

void main();
