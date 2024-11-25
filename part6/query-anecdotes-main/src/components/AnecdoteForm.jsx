import { useMutation, useQueryClient } from "@tanstack/react-query"
import AnecdotesQueries from "../services/anecdotes"
import { useNotificationDispatch } from "../../notificationStateManage"

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: AnecdotesQueries.createAnecdote,
    onSuccess: queryClient.invalidateQueries({queryKey: ['anecdotes']}),
    onError: ()=> {
      notificationDispatch(
        {
          type: 'notify',
          payload: 'too short anecdote, must have length 5 or more'
        }
      )
      setTimeout(() =>
      {
        notificationDispatch(
          {
            type: 'notify',
            payload: null
          }
        )
      }, 5000)
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
    notificationDispatch({
      type: 'notify',
      payload: `new note created: '${content}'`
    })
    setTimeout(() =>
    {
      notificationDispatch({
        type: 'notify',
        payload: null
      })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
