import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { setupDB } from "./utils/setupDB";
import { Database } from "sqlite";

export type ContextValue = {
  db: Database;
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
      };
    },
  });
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

void main();
