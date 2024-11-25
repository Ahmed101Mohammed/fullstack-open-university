import axios from 'axios'
const baseUrl = '/api/persons'

const getAllPersons = ()=>
{
    const promise = axios.get(baseUrl)
    return promise.then(res=> res.data)
}

const addNewPerson = (personData)=>
{
    const promise = axios.post(baseUrl, personData)
    return promise.then(res=>res.data)
}

const deletePerson = (personId)=>
{
    const promise = axios.delete(`${baseUrl}/${personId}`)
    return promise.then(res => res.data)
}

const updatePersonNumber = (personData, newNumber)=>
{
    const promise = axios.put(`${baseUrl}/${personData.id}`, {...personData, number: newNumber})
    return promise.then(res=>res.data)
}

export default {
    getAllPersons, 
    addNewPerson,
    deletePerson,
    updatePersonNumber
}