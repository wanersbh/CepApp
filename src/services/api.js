import axios from "axios";

// Podemos trabalhar com duas api que busca o cep
// https://cep.awesomeapi.com.br/json/30840340
// https://viacep.com.br/ws/32143280/json/
const api = axios.create({
    baseURL: 'https://cep.awesomeapi.com.br/json'
});

export default api;