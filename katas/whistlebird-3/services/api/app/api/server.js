"use strict";
// Read the .env file.
import * as dotenv from "dotenv"
// Require the framework
import Fastify from "fastify"
import mercurius from 'mercurius'
import { schema, resolvers, context } from "../graphql/index.js"


dotenv.config();

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

app.register(mercurius, {
  schema,
  resolvers,
  context,
})

// Register your application as a normal plugin.
app.register(import("../src/app.js"));
try {
  await app.ready();
  await app.listen({ port: 3000, host: '0.0.0.0' })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
