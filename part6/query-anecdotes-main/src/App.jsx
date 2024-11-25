import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import axios from 'axios'
import AnecdotesQueries from './services/anecdotes'
import { useNotificationDispatch, useNotificationState } from '../notificationStateManage'

const App = () => {
  const queryClient = useQueryClient()
  const voteMutation = useMutation({
    mutationFn: AnecdotesQueries.updateAnecdote,
    onSuccess: queryClient.invalidateQueries(['anecdotes'])
  })
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(response => response.data)
  })
  const notificationDispatch = useNotificationDispatch()
  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
    notificationDispatch({
      type: 'notify',
      payload: `anecdote '${anecdote.content}' voted`
    })
    setTimeout(() => 
    {
      notificationDispatch({
        type: 'notify',
        payload: null
      })
    }, 5000)
    console.log('vote')
  }
  const notification = useNotificationState()

  let anecdotes = []

  if(result.isSuccess)
  {
    anecdotes = anecdotes.concat(result.data)
  }
  else if(result.isError)
  {
    return <h2>anecdote service not avilable due to problems in server</h2>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification notification={notification} />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
