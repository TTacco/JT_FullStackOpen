const Notification = ({success, message}) => {

    if(!message) return null;

    return (
        <div>
            {message}
        </div>
    )    
}

export default Notification;