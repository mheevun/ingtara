const { Prisma } = require("prisma-binding");
const { ApolloServer, gql } = require("apollo-server");
const { importSchema } = require("graphql-import");
const { MemcachedCache } = require("apollo-server-cache-memcached");

const typeDefs = importSchema("./src/app-schema.graphql");
const Query = require("./src/Query");
const Mutation = require("./src/Mutation");

const db = new Prisma({
  typeDefs: "./generated/prisma/root-schema.graphql",
  endpoint: "https://us1.prisma.sh/ppwasin/ingtara-backend/dev",
  secret: "currentlyDrinkingPhilzCoffee"
});

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Mutation,
    Query
  },
  persistedQueries: {
    cache: new MemcachedCache(
      ["memcached-server-1", "memcached-server-2", "memcached-server-3"],
      { retries: 10, retry: 10000 } // Options
    )
  },
  context: ({ req }) => ({
    ...req,
    db
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
