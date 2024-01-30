import { insertPost } from "../src/helpers/insert-post.js"
import { queryPosts } from "../src/helpers/query-posts.js"

export const resolvers = {
	Query: {
		hello: () => 'hi graphql',
    posts: async (parent, args, { client }, info) => {
      const data = await queryPosts(client)
      client.end()
      return data
    },
	},
  Mutation: {
    post: async (parent, { message }, { client, token }, info) => {
      await insertPost(client, message, token)
      client.end()
      return ({ success: 'OK' })
    }
  }
}
