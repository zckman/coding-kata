import useSWR from 'swr'

const fetcher = async (url: string) => {
  const requestBody = {
    query: `
    {
      posts {
        user {
          name
        }
        message
        created_at
      }
    }`,
    variables: {},
    operationName: null
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });
  const { data } = await res.json()
  return data.posts as { message: string, created_at: string, user: { name: string } }[]
}

// @ts-expect-error bla
const handleSubmit = async (event) => {
  event.preventDefault()

  const text = event.target[0].value

  const requestBody = {
    query: `
    mutation {
      post(message: "${text}") {
        success
      }
    }`,
    variables: {},
    operationName: null
  }
  const res = await fetch('api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });
  await res;
}

function App() {
  const { data, error, isLoading } = useSWR('api/graphql', fetcher, { refreshInterval: 1000 })

  return (
    <main className="max-w-3xl mx-auto p-2">
      <form onSubmit={handleSubmit} className="flex py-2 font-mono">
        <input type="text" name="message" placeholder="message" className='flex-1 border rounded-l p-2' />
        <button type="submit" className="py-2 px-4 rounded-r bg-slate-200">send</button>
      </form>
      {isLoading && (<p className="py-2 text-sky-500 text-base font-mono font-medium">loading...</p>)}
      {!error && !isLoading && data && data.map(({ message, created_at, user }, i) => (
        <div key={`${i}_${message}`} className="flex flex-col py-2 font-mono font-medium border-b border-slate-200">
          <span className="text-sky-500 text-xs">
            {(new Date(created_at)).toLocaleDateString('de-DE')}
          </span>
          <span className="text-base pt-2">
            {user ? `${user.name} says: ` : ''}
            {message}
          </span>
        </div>
      ))}
    </main>
  )
}

export default App
