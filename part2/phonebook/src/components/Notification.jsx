const Notification = (props)=>
{
    const {message} = props
    if(!message[0]) return
    // styling
    const messageContainer = {
        padding: '5px',
        width: '100%',
        backgroundColor: 'lightgreen',
        margin: 5
    }

    const messageStyling = {
        fontSize: 20,
        color: 'green',
        margin: 0
    }

    if(!message[1])
    {
        messageContainer.backgroundColor = 'lightred'
        messageStyling.color = 'red'
    }
    return    (
        <div style={messageContainer}>
            <p style={messageStyling}>{message}</p>
        </div>
    )
}

export default Notification