import Input from "./Input"

const PersonForm = (props)=>
{
    const {onSubmit, name1, controller1, onChange1, name2, controller2, onChange2} = props
    return(
    <form onSubmit={onSubmit}>
        <Input name={name1} controller={controller1} onChange={onChange1} />
        <Input name={name2} controller={controller2} onChange={onChange2} />
        <div>
        <button type="submit">add</button>
        </div>
    </form>
    )
}

export default PersonForm