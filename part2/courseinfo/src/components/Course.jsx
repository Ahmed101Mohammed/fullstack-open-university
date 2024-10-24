const Header = ({course})=>
{
    return (
    <h1>{course.name}</h1>
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

const Content = ({course})=>
{
    let partsData = course.parts
    return (
    <div>
        {partsData.map((part)=> <Part key={part.id} partTitle={part.name} exercisesNumber={part.exercises}/>)}
    </div>
    )
}

const Total = ({course})=>
{
    let parts = course.parts
    let total = parts.reduce((total, part)=> total + part.exercises, 0)
    return (
    <p><strong>total of {total} exercises</strong></p>
    )
}

const Course = (props)=>
{
    const {course} = props
    return (
    <>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
    </>
    )
}

export default Course