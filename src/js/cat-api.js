import axios from "axios";

const apiKey = 'live_mctQaSOjUtIzROXi8NaiFh9LZ4e2JU9sbZmfHi156PE0BQbuHNUEZWu7WVk1QlZ1'
axios.defaults.headers.common["x-api-key"] = apiKey;

const fetchBreeds = () => axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then((response) => {
        if (!response.data) return new Error(response.status);
        return response.data;
    })

const fetchCatByBreed = (id) => axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`)
    .then((response) => {
        if (!response.data) return new Error(response.status);
        return response.data[0];
    })


module.exports = {
    fetchBreeds, fetchCatByBreed
}