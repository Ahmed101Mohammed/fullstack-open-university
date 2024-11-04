import axios from 'axios'
import { useEffect, useState } from 'react'
import View from './components/View'

function App() {
  const[countries, setCountries] = useState([])
  const[searchController, setSearchController] = useState("")
  const [currCountry, setCurrCountry] = useState(null)

  // Get Intial data
  const useEffectHock = ()=>
  {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res=>
      {
        const data = res.data
        setCountries(data)
      }
      )
  }
  useEffect(useEffectHock, [])

  const onChangeSearchHandller = (e)=>
  {
    setSearchController(e.target.value)
    setCurrCountry(null)
  }
  // result results
  let results = []
  if(searchController.length > 0) results = countries.filter((country)=> country.name.official.toLowerCase().includes(searchController.toLowerCase()))
  return (
    <>
      <div>
        <label htmlFor="search">Find country</label>
        <input type="text" id='search'  value={searchController} onChange={onChangeSearchHandller}/>
      </div>
      <View countries={results} currCountry={currCountry} setCurrCountry={setCurrCountry}/>
    </>
  )
}

export default App
