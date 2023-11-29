import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { db, setupDB } from "./utils/setupDB";
import { Drink } from "./data/dataTypes";

setupDB();

db.each(
  `SELECT id, type, name, season, vibe as vibe FROM drinks`,
  [],
  (err, row: Drink) => {
    if (err) console.log(err);
    console.log(row);
  }
);

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server);
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
