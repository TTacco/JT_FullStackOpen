import axios from 'axios';
const numberURL = "/api/persons"

const getNumbers = () => {
    const response = axios.get(numberURL);
    return response
        .then(numbers => numbers.data)
}

const addNumber = (newEntry) => {
    const request = axios.post(numberURL, newEntry)
    return request.then(response => response.data)
}

const editNumber = (id, newEntry) => {
    const request = axios.put(`${numberURL}/${id}`, newEntry)
    return request.then(response => response.data)
}

const deleteNumber = (id) => {
    const response = axios.delete(numberURL + `/${id}`);
    return response.then(r => console.log(r));
}

export default { getNumbers, addNumber, deleteNumber, editNumber};