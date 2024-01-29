export const insertPost = async (client, message, token) => {
  const users = await client.query({
    text: 'SELECT id from users WHERE token = $1',
    values: [token]  
  })
  await client.query({
    text: 'INSERT INTO posts (message, user_id) VALUES ($1, $2)',
    values: [message, users.rows[0]?.id ?? null]
  }) 
}