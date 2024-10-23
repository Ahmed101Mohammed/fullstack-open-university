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
      <Part partTitle={partsData[0].name} exercisesNumber={partsData[0].exercises}/>
      <Part partTitle={partsData[1].name} exercisesNumber={partsData[1].exercises}/>
      <Part partTitle={partsData[2].name} exercisesNumber={partsData[2].exercises}/>
    </div>
  )
}

const Total = ({parts})=>
{
  let total = 0;
  for(let part of parts)
  {
    total += part.exercises
  }
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content partsData={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App