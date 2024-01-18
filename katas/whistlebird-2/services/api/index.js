const fastify = require('fastify')({ logger: true })
const knex = require("knex");

let db;

fastify.get('/', async (request, reply) => {
  reply.code(200).send('Whistlebird') // Stubbed response
})

// GET /posts
fastify.get('/posts', async (request, reply) => {
  reply.code(200).send({ data: [] }) // Stubbed response
})

// POST /posts
fastify.post('/posts', async (request, reply) => {
  reply.code(201).send({}) // Stubbed response
})

// GET /users
fastify.get('/users', async (request, reply) => {
  reply.code(200).send({ data: [] }) // Stubbed response
})

// POST /users
fastify.post('/users', async (request, reply) => {
  reply.code(201).send({}) // Stubbed response
})

// POST /token
fastify.post('/token', async (request, reply) => {
  reply.code(201).send({ data: { token: 'stubbed_token' } }) // Stubbed response
})

// GET /docs
fastify.get('/docs', async (request, reply) => {
  //TODO send specs
  reply.code(200).send({})
})

// Run the server!
const start = async () => {
  try {
    db = knex({
      client: "pg",
      connection: process.env.POSTGRES_CONNECTION_STRING,
      useNullAsDefault: true,
    });
    await fastify.listen({port: 3000, host: "0.0.0.0"})
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
