import Fastify from 'fastify'
import { getClient } from './db.js'
import { createHash } from 'crypto'

async function routes (fastify, options) {

  const sha256 = data => createHash('sha256').update(data).digest("hex")

  fastify.get('/posts', async (request, reply) => {

    try {
      const client = await getClient() 
      const posts = await client.query('SELECT user_id, message, created_at FROM posts ORDER BY created_at desc')

      const response = await Promise.all(posts.rows.map(async ({message, user_id, created_at}) => {
        const user = await client.query({
          text: 'SELECT name, image FROM users where id=$1 LIMIT 1',
          values: [user_id],
        })
        const userData = user.rows[0]
        return {
          user: userData ? {...userData} : null, 
          message,
          created_at
        }
      })) 
      return reply
        .code(200)
        .send({data: response})
    } catch (e) {
      return reply
        .code(409)
        .send({error: e.message})
    }
  })

  fastify.get('/users', async (request, reply) => {

    const client = await getClient() 
    const users = await client.query('SELECT name, image FROM users',)
    
    return reply.send({data: users.rows})
  })

  fastify.post('/users', async (request, reply) => {
    const {name, password} = request.body

    const image = await fetch('https://picsum.photos/200', { method: 'GET', redirect: 'follow'})
    const token = sha256(`${name}${password}${image.url}`) 

    try {
      const client = await getClient() 
      await client.query({
        text: 'INSERT INTO users (name, password, image, token) VALUES ($1, $2, $3, $4)',
        values: [name, password, image.url, token]
      })

      return reply
        .code(201)
        .send({})
    } catch (e) {
      return reply
        .code(409)
        .send({error: e.message})
    }
  })

  fastify.post('/posts', async (request, reply) => {
    const { message } = request.body
    const { token } = request.headers

    try {
      const client = await getClient() 
      const users = await client.query({
        text: 'SELECT id from users WHERE token = $1',
        values: [token]  
      })
      await client.query({
        text: 'INSERT INTO posts (message, user_id) VALUES ($1, $2)',
        values: [message, users.rows[0]?.id ?? null]
      })
      return reply
        .code(201)
        .send({})
    } catch (e) {
      reply
        .code(409)
        .send({error: e.message})
    }
  })

  fastify.post('/token', async (request, reply) => {
    const { name, password } = request.body

    try {
      const client = await getClient() 
      const users = await client.query({
        text: 'SELECT token from users WHERE name = $1 AND password = $2',
        values: [name, password]  
      })
      if (!users.rows.length) {
        return reply
          .code(400)
          .send({error: "Wrong name or password"})
      }

      const token = users.rows[0].token

      return reply
        .code(200)
        .send({token})
    } catch (e) {
      reply
        .code(400)
        .send({error: e.message})
    }
  })

}

export default routes;
