import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdote"
const anecdoteReducer = createSlice(
  {
    name: 'anecdote',
    initialState: [],
    reducers: {
      appendAnecdote(state, action)
      {
        const anecdote = action.payload
        return [...state, anecdote]
      },
      increaseAnecdoteVoice(state, action)
      {
        const anecdoteUpdatedInDB = action.payload
        const newState = state.map(anecdote => 
        {
          if(anecdote.id === anecdoteUpdatedInDB.id)
          {
            anecdote = anecdoteUpdatedInDB
          }
          return anecdote
        })
        const sortedState = newState.sort((a, b) => b.votes - a.votes)
        return sortedState
      },
      setAnecdotes(state, action)
      {
        return action.payload.sort((a, b) => b.votes - a.votes)
      }
    }
  }
)

export const { appendAnecdote, increaseAnecdoteVoice, setAnecdotes } = anecdoteReducer.actions

export const initilizeAnecdotes = () =>
{
  return async dispatch =>
  {
    const anecdotes = await anecdoteService.getAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) =>
{
  return async dispatch =>
  {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = (id, newAnecdoteVersion) =>
{
  return async dispatch =>
  {
    const updatedAnecdoteb = await anecdoteService.updateAnecdote(id, newAnecdoteVersion)
    dispatch(increaseAnecdoteVoice(updatedAnecdoteb))
  }
}
export default anecdoteReducer.reducer