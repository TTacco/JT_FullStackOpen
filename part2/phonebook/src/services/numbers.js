import axios from 'axios';
const baseURL = "/api/persons"

const getNumbers = () => {
    const response = axios.get(baseURL);
    return response
        .then(numbers => numbers.data)
}

const addNumber = (newEntry) => {
    const request = axios.post(baseURL, newEntry)
    return request.then(response => response.data)
}

const editNumber = (id, newEntry) => {
    const request = axios.put(baseURL + `/${id}`, newEntry)
    return request.then(response => response.data)
}

const deleteNumber = (id) => {
    const response = axios.delete(baseURL + `/${id}`);
    return response.then(r => console.log(r));
}

export default { getNumbers, addNumber, deleteNumber, editNumber};