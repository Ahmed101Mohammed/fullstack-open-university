const Input = (props)=>
{
    const {name, controller, onChange} = props
    return(
    <div>
        {name} <input value={controller} onChange={onChange}/>
    </div>
    )
}

export default Input