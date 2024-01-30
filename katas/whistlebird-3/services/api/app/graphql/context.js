import { getClient } from "../src/db.js"

export const context = async ({ headers }) => ({
  client: await getClient(),
  token: headers.token ?? undefined
})
