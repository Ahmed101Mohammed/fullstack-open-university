import Input from "./Input"
const Filter = (props)=>
{
    const {name, controller, onChange} = props
    return (
    <Input name={name} controller={controller} onChange={onChange}/>
    )
}

export default Filter