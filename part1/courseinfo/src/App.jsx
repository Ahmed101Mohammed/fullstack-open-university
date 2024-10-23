const Header = ({course})=>
{
  return (
    <h1>{course}</h1>
  )
}

const Content = ({partTitle, exercisesNumber})=>
{
  return(
    <p>
      {partTitle} {exercisesNumber}
    </p>
  )
}

const Total = ({exercises})=>
{
  const total = exercises.reduce((i, acc)=> acc + i, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content partTitle={part1} exercisesNumber={exercises1}/>
      <Content partTitle={part2} exercisesNumber={exercises2}/>
      <Content partTitle={part3} exercisesNumber={exercises3}/>
      <Total exercises={[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App