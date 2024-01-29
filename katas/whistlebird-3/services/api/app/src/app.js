import { getClient } from './db.js'
import { createHash } from 'crypto'
import swagger from '@fastify/swagger' 
import cors from '@fastify/cors' 
import { insertPost } from './helpers/insert-post.js'
import { queryPosts } from './helpers/query-posts.js'


async function routes (fastify, options) {

  await fastify.register(cors, { 
    origin: '*',
    methods: ['GET', 'PUT', 'POST']
  })

  await fastify.register(swagger, {
    swagger: {
      info: {
        title: 'Whistlebird API',
        description: 'Cheap knock-off of Twitter - Coding kata',
        version: '0.1.0'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  })

  const sha256 = data => createHash('sha256').update(data).digest("hex")

  fastify.get('/posts', {
      schema: {
        description: 'get all posts',
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    user: {
                      type: 'object',
                      properties: {
                        name: {type: 'string'},
                        image: {type: 'string'}
                      }
                    },
                    message: {type: 'string'},
                    created_at: {type: 'string'}
                  }
                } 
              }
            }
          },
          500: {
            description: 'Failing response',
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          },
        }
      }
    }, async (request, reply) => {
      const client = await getClient()
      try {
        const response = await queryPosts(client)

        return reply
          .code(200)
          .send({data: response})
      } catch (e) {
        return reply
          .code(500)
          .send({error: e.message})
      } finally {
        await client.end();
      }
  })

  fastify.get('/users', {
      schema: {
        description: 'get all users',
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: {type: 'string'},
                    image: {type: 'string'}
                  }
                } 
              }
            }
          },
          500: {
            description: 'Failing response',
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          },
        }
      }
    }, async (request, reply) => {

    const client = await getClient() 
    const users = await client.query('SELECT name, image FROM users',)
    
    await client.end();

    return reply.send({data: users.rows})
  })

  fastify.post('/users', {
      schema: {
        description: 'create a new user',
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            password: { type: 'string' }
          }
        },
        response: {
          201: {
            description: 'Successful response',
            type: 'object',
            properties: {}
          },
          500: {
            description: 'Failing response',
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          },
        }
      }
    }, async (request, reply) => {
    const {name, password} = request.body

    const image = await fetch('https://picsum.photos/200', { method: 'GET', redirect: 'follow'})
    const token = sha256(`${name}${password}${image.url}`) 

    const client = await getClient() 
    try {
      await client.query({
        text: 'INSERT INTO users (name, password, image, token) VALUES ($1, $2, $3, $4)',
        values: [name, password, image.url, token]
      })

      return reply
        .code(201)
        .send({})
    } catch (e) {
      return reply
        .code(500)
        .send({error: e.message})
    } finally {
      await client.end();
    }
  })

  fastify.post('/posts', {
      schema: {
        description: 'create a new post',
        headers: {
          token: {
            type: 'string',
            description: 'user token generated after login'
          }
        },
        body: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        },
        response: {
          201: {
            description: 'Successful response',
            type: 'object',
            properties: {}
          },
          409: {
            description: 'Failing response',
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          },
        }
      }
    }, async (request, reply) => {
    const { message } = request.body
    const { token } = request.headers

    const client = await getClient() 
    try {
      await insertPost(client, message, token)

      return reply
        .code(201)
        .send({})
    } catch (e) {
      return reply
        .code(409)
        .send({error: e.message})
    } finally {
      await client.end();
    }

  })

  fastify.post('/token', {
      schema: {
        description: 'create token for registered users',
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            password: { type: 'string' }
          }
        },
        response: {
          201: {
            description: 'Successful response',
            type: 'object',
            properties: {
              data:{
                type: 'object',
                properties: {
                  token: {type: 'string'}
                }
              }
            }
          },
          400: {
            description: 'Failing response',
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          },
        }
      }
    }, async (request, reply) => {
    const { name, password } = request.body

    const client = await getClient() 
    try {
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
        .send({
          data: {
            token
          }
        })
    } catch (e) {
      return reply
        .code(400)
        .send({error: e.message})
    } finally {
      await client.end();
    }

  })

  fastify.get('/docs', async (request, reply) => {
    return fastify.swagger()
  })

}

export default routes;
