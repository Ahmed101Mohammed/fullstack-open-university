import { useState } from 'react'

const StatisticLine = (props)=>
{
  const {text, value} = props

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = (props)=>
{
  const {good, neutral, bad} = props
  const all = good + neutral + bad
  if(all === 0)
  {
    return <p>No feedback given</p>
  }
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={(good-bad)/all}/>
          <StatisticLine text="positive" value={(good/all)*100}/>
        </tbody>
      </table>
    </>
  )
}

const Button = (props)=>
{
  const {text, onClick} = props
  
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={()=> setGood(good + 1)} text="good" />
      <Button onClick={()=> setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={()=> setBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App