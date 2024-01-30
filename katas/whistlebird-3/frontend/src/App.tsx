import useSWR from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const { data } = await res.json()
  return data as { message: string, created_at: string, user: { name: string } }[]
}

function App() {
  const { data, error, isLoading } = useSWR('api/posts', fetcher, { refreshInterval: 1000 })

  return (
    <main className="max-w-3xl mx-auto p-2">
      <form onSubmit={() => {}} className="flex py-2 font-mono">
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
            {user ? `${user.name} says:` : ''}
            {message}
          </span>
        </div>
      ))}
    </main>
  )
}

export default App
