export const schema = `
  type User {
    name: String!
    image: String!
  }
  type Post {
    user: User
    message: String!
    created_at: String!
  }
  type Query {
    hello: String!
    posts: [Post]
    users: [User]
  }
  type Success {
    success: String
  }
  type Mutation {
    post(message: String!): Success
  }
`
