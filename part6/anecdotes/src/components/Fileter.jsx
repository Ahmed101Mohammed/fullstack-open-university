import { useDispatch } from "react-redux"
import { filter } from "../reducers/filterReducer"

const Filter = () => 
{
  const dispatch = useDispatch()
  const handleChange = (event) => 
  {
    const filterContent = event.target.value
    dispatch(filter(filterContent))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter