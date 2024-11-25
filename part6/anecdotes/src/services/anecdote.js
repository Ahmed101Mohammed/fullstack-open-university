import axios from "axios"

const getAnecdotes = async() =>
{
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

const createAnecdote = async(content) =>
{
  const newAnecdote = {
    content,
    votes: 0
  }
  const response = await axios.post('http://localhost:3001/anecdotes', newAnecdote)
  return response.data
}

const updateAnecdote = async(id, newAnecdoteVersion) =>
{
  const response = await axios.put(`http://localhost:3001/anecdotes/${id}`, newAnecdoteVersion)
  return response.data
}

const anecdoteService = {
  getAnecdotes,
  createAnecdote,
  updateAnecdote
}

export default anecdoteService