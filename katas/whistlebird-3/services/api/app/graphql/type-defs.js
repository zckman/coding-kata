export const schema = `
  scalar Date
  type User {
    name: String!
    image: String!
  }
  type Post {
    user: User
    message: String!
    created_at: Date!
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
