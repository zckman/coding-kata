export const queryPosts = async (client) => {
  const posts = await client.query('SELECT user_id, message, created_at FROM posts ORDER BY created_at desc')

  const response = await Promise.all(posts.rows.map(async ({ message, user_id, created_at }) => {
    const user = await client.query({
      text: 'SELECT name, image FROM users where id=$1 LIMIT 1',
      values: [user_id],
    })
    const userData = user.rows[0]
    return {
      user: userData ? {...userData} : undefined, 
      message,
      created_at
    }
  }))

  return response
}