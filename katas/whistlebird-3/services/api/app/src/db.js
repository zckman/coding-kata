import pkg from 'pg'
const { Client } = pkg

export const getClient = async () => {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
  })
  await client.connect()

  return client 
}

