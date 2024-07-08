import axios from 'axios';

const xApi = axios.create({
    baseURL: 'https://magaz.tonwinners.com/x-api'
    // baseURL: 'http://localhost:3220/x-api'
})

export default xApi;