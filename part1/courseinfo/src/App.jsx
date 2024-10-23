const Header = ({course})=>
{
  return (
    <h1>{course}</h1>
  )
}

const Part = ({partTitle, exercisesNumber})=>
{
  return(
    <p>
      {partTitle} {exercisesNumber}
    </p>
  )
}

const Content = ({partsData})=>
{
  return (
    <div>
      <Part partTitle={partsData[0].part} exercisesNumber={partsData[0].exercise}/>
      <Part partTitle={partsData[1].part} exercisesNumber={partsData[1].exercise}/>
      <Part partTitle={partsData[2].part} exercisesNumber={partsData[2].exercise}/>
    </div>
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
      <Content partsData={[{part: part1, exercise: exercises1}, 
                          {part: part2, exercise: exercises2}, 
                          {part: part3, exercise: exercises3}]}/>
      <Total exercises={[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App