import { useEffect, useState } from 'react'
import personAPI from './services/person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searshText, setSershText] = useState('')
  const [message, setMessage] = useState([null, null])

  const showData = persons.filter((person)=> {
    if(searshText.length > 0)
    {
      return person.name.toLowerCase().includes(searshText.toLowerCase())
    }
    return persons
  })

  const addPerson = (event)=>
  {
    event.preventDefault()
    let dublicated = persons.filter((person)=> person.name === newName)
    if(dublicated.length !== 0)
    {
      let oldPerson = dublicated[0];
      let confirm = window.confirm(`${oldPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if(!confirm) return

      personAPI.updatePersonNumber(oldPerson, newNumber)
        .then(newPersonData =>
          {
            let newPersons = persons.map(person=>
                                    {
                                      if(person.id === newPersonData.id) person.number = newPersonData.number
                                      return person
                                    }
                                    )
            setPersons(newPersons)
            setNewNumber("")
            setNewName("")
            setMessage([`Updated the phone number for ${newPersonData.name}`, true])
            setTimeout(()=> setMessage([null,null]), 5000)
          }
        )
        .catch(error=>
        {
          if(error.response)
          {
            setMessage([error.response.data.error, false])
          }
          else
          {
            setMessage([`Information of ${oldPerson.name} has already been removed from server.`, false])
          }
          setTimeout(()=>setMessage([null,null]), 5000)
        }
        )
      return
    }
    personAPI.addNewPerson({name:newName, number:newNumber})
      .then((newPerson)=>
      {
        setPersons(persons.concat(newPerson))
        setNewNumber("")
        setNewName("")
        setMessage([`Added ${newPerson.name}`,true])
        setTimeout(()=> setMessage([null,null]), 5000)
      })
      .catch((error)=>
      {
        const message = error.response.data.error
        setMessage([message, false])
        setTimeout(()=> setMessage([null,null]), 5000)
      })
    
  }

  const deletePersonFrontProc = (id)=>
  {
      let person = persons.find((person)=> person.id === id)
      let confirm = window.confirm(`Delete ${person.name}?`)
      if(!confirm) return
      personAPI.deletePerson(id)
      .then(()=>
        {
            let filteredPersons = persons.filter(person=> person.id !== id)
            setPersons(filteredPersons)
        }
      )
  }

  useEffect(()=>
    {
      personAPI.getAllPersons()
      .then((persons)=>
      {
        setPersons(persons)
      })
    },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter name="filter shown with" controller={searshText} onChange={(event)=> setSershText(event.target.value)} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson}
                  name1="name"
                  controller1={newName}
                  onChange1={(event)=> setNewName(event.target.value)}
                  name2="number"
                  controller2={newNumber}
                  onChange2={(event)=> setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <Persons showData={showData} deleteHandler={deletePersonFrontProc} />
    </div>
  )
}

export default App