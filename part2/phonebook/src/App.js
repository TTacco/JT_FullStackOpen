import React, { useState, useEffect } from 'react';
import './App.css';
import Notification from './components/Notification'
import numbersService from './services/numbers'

function App() {
    const [numbers, setNumbers] = useState([])
    const [newName, setName] = useState('');
    const [newNumber, setNumber] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    //Notification states
    const [notificationProps, setNotificationProps] = useState({message: null, success: false});

    useEffect(()=>{
        numbersService
            .getNumbers()
            .then((numbers)=> {
                setNumbers(numbers);
            })
            .catch((error) => {
                console.error("Unable to get numbers from DB ", error);
            })
        }
    ,[]);

    //Receives a message to display and if whether to use the successful css styling or not to the notification
    const enableNotification = (message, success, duration) => {
        const newNotification = {message,success}
        setNotificationProps(newNotification) 
            setTimeout(()=> {
                setNotificationProps({message: null, success: false});
            }, duration)
    }

    const addEntry = () => {
        const newEntry = {
            "name": newName,
            "number": newNumber,
            "date": new Date().toISOString
        }

        const exist = numbers.find(n => n.name.toLowerCase() === newName.toLowerCase());
        if(exist){
            if (window.confirm('Entry already exists, would you edit?')){
                numbersService.editNumber(exist.id, newEntry).then((res) => {
                    alert("Successfully edited the entry");
                }).catch((error) => {
                    alert("Unable to edit the entry", error);
                })
            } 
           
        }
        else{
            numbersService.addNumber(newEntry).then((res) => {
                enableNotification("Successfully added a new entry", true, 3000);
            }).catch((error) => {
                alert("Unable to add new entry", error);
            })
        }       
    }

    const deleteEntry = (id) => {
        numbersService.deleteNumber(id).then(() => {
            enableNotification("Successfully deleted an entry", true, 3000);
        }).catch((error)=> {
            enableNotification("Cannot delete non existing entry", false, 3000);
        });
    }

    const stateHandler = (event, stateChangeFunction) => {
        stateChangeFunction(event.target.value);
    }


    const numbersToDisplay = (searchQuery)? 
        numbers.filter((number) => number.name.toLowerCase().includes(searchQuery.toLowerCase())) : 
        numbers;

    return (
        <div>
            <Notification {...notificationProps}/>
            <h2>Phonebook</h2>
                <input value={searchQuery} onChange={(event) => stateHandler(event, setSearchQuery)}></input>
            <h4>Add new</h4>    
                <div>
                    Name <input value={newName} onChange={(event) => stateHandler(event, setName)}/>
                </div>
                <div>
                    Number <input value={newNumber} onChange={(event) => stateHandler(event, setNumber)}/>
                </div>
                <button onClick={addEntry}>Add</button>
            <h4>Numbers</h4>
                <ul>
                    {numbersToDisplay.map(n => 
                            <li id={n.id}>{`${n.name} - ${n.number}`} <button onClick={()=> deleteEntry(n.id)}>DELETE</button></li> 
                        )
                    }
                </ul>
        </div>
    )
}

export default App;
