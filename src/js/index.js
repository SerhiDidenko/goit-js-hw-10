import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selector = document.querySelector('.breed-select');
const loader = document.querySelector('.load-container');
const catInfo = document.querySelector('.cat-info');

const setupSelector = (breeds) => {
    selector.innerHTML = breeds.map(b => `<option value="${b.id}">${b.name}</option>`).join('\n');
}

const showInfo = (info) => {
    let breed = info.breeds[0];
    const markup = `<img class="image" src="${info.url}" alt="${breed.name}" height="${info.height}" width="${info.width}">
    <div class="content">
        <h2 class="title">${breed.name}</h2>
        <p class="description">${breed.description}</p>
        <p><span class="info">Temperament: </span>${breed.temperament}</p>
        <p><span class="info">Origin: </span>${breed.origin}</p>
    </div>`
    catInfo.innerHTML = markup;
}

fetchBreeds()
    .then(result => {
        setupSelector(result);
        selector.classList.toggle('is-hidden');
        loader.classList.toggle('is-hidden');
    })
    .then(() => new SlimSelect({ select: '.breed-select' }))
    .catch(() => {
        Notiflix.Notify.failure(
            `Oops! Something went wrong! Try reloading the page!`,
            { timeout: 4000, useIcon: false },
        )
    });

const onSelect = () => {
    loader.classList.toggle('is-hidden');
    fetchCatByBreed(selector.value)
    .then((result) => {
        loader.classList.toggle('is-hidden');
        showInfo(result);
    })
    .catch(() => {
        Notiflix.Notify.failure(
            `Oops! Something went wrong! Try reloading the page!`,
            { timeout: 4000, useIcon: false },
        )
    });
} 

selector.addEventListener("change", onSelect);