import axios from 'axios'
import { useEffect, useState } from 'react'
export const useResource = (baseUrl) =>
{
    const [indeviduals, setIndeveduals] = useState([])
    let token = null

    const setToken = newToken => {
      token = `bearer ${newToken}`
    }

    const getAll = async () => {
      const response = await axios.get(baseUrl)
    return response.data
    }

    const create = async newObject => {
      const config = {
        headers: { Authorization: token },
      }

      const response = await axios.post(baseUrl, newObject, config)
      return response.data
    }

    const update = async (id, newObject) => {
      const response = await axios.put(`${ baseUrl }/${id}`, newObject)
      return response.data
    }
    const services = {
      setToken, getAll, create, update
    }

    useEffect( () => 
    {
      getAll()
        .then(data => 
        {
          setIndeveduals(indeviduals.concat(...data))
        }
        )
    }, [])
    
    return [
      indeviduals,
      services
    ]
}