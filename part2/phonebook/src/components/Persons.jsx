import personAPI from '../services/person'

const Person = ({name, number, deleteHandler})=>
{
    return(
    <p><strong>{name}</strong> {number} <button onClick={deleteHandler}>delete</button></p>
    )
}

const Persons = (props)=>
{
    const {showData, deleteHandler} = props

    return (
    <>
        {showData.map((person)=><Person key={person.id} 
                                        name={person.name} 
                                        number={person.number} 
                                        deleteHandler={()=>deleteHandler(person.id)}/>)}
    </>
    )
}

export default Persons