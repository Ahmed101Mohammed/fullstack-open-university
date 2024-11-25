import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { removeNotification, setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () =>
{
  const dispatch = useDispatch()
  const createAnecdoteHandler = async(event) =>
  {
    event.preventDefault()

    const anecdote = event.target.anecdote.value
    dispatch(createAnecdote(anecdote))
    event.target.anecdote.value = ''
    dispatch(setNotification([true, `You created '${anecdote}' anecdote`], 5))
  }

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={createAnecdoteHandler}>
      <div><input name='anecdote' /></div>
      <button type='submit'>create</button>
    </form>
    </>
  )
}

export default AnecdoteForm