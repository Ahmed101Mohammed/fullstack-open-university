import axios from "axios"
import { useEffect, useState } from "react"

const CountryOption = (props)=>
{
    const {country, showHandller} = props
    const name = country.name.common
    return (
    <li>
        <span>{name}</span>
        <button onClick={()=>showHandller(country)}>show</button>
    </li>
    )
}

const FullCountryData = (props)=>
{
    const [weather, setWeather] = useState(null)

    const {country} = props
    const name = country.name.common
    const capital = country.capital
    const area = country.area
    const languages = country.languages
    const flagEmage = country.flags.svg
    const flagAlt = country.flags.alt
    const hook = ()=>
    {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=6dd408a69b094c61c697e979d75389ac`
        axios.get(url)
        .then(res=>
        {
            let data = res.data
            setWeather(data)
            console.log(data)
        }
        )
    }

    useEffect(hook, [])
    return(
        <main>
            <h1>{name}</h1>
            <p><strong>Capital: </strong>{capital}</p>
            <p><strong>Area: </strong>{area}</p>
            <h2>Languages</h2>
            <ul>
                {
                    Object.values(languages).map(lang=><li key={lang}>{lang}</li>)
                }
            </ul>
            <img src={flagEmage} alt={flagAlt} />
            {
                weather?<>
                <h2>Weather in {capital}</h2>
                <p>Temperature {weather.main.temp} Fehrenheit</p>
                <p>Wind {weather.wind.speed} m/s</p>
                </>:null
            }
        </main>
    )
}

const View = (props)=>
{
    const {countries, currCountry, setCurrCountry} = props
    if(currCountry) return <FullCountryData country={currCountry} />
    if(countries.length === 0) return
    if(countries.length > 10)
    {
        return <p>To many matches, Specify another filter</p>
    }
    else if(countries.length > 1)
    {
        return <ul>{countries.map(country=><CountryOption key={country.name.common} country={country} showHandller={setCurrCountry}/>)}</ul>
    }

    let country = countries[0]
    return <FullCountryData country={country} />
    
}

export default View