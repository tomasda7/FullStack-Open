import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
};

const create = (newObj) => {
    const request = axios.post(baseURL, newObj)
    return request.then(response => response.data)
};

const personService = { getAll, create }
export default personService;
