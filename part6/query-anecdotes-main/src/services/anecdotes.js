import axios from "axios"

const createAnecdote = async(anecdoteContent) =>
{
  const response = await axios.post('http://localhost:3001/anecdotes', {
    content: anecdoteContent,
    votes: 0
  })
  return response.data
}

const updateAnecdote = async(anecdoteObj) =>
{
  const response = await axios
    .put(`http://localhost:3001/anecdotes/${anecdoteObj.id}`, {...anecdoteObj, votes: anecdoteObj.votes+1})
  return response.data
}

const AnecdotesQueries = {
  createAnecdote,
  updateAnecdote
}
export default AnecdotesQueries