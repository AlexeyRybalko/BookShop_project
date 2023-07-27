import initSlider from "./components/slider.js";
import BookList from "./components/BookList.js";
import BookCard from "./components/BookCard.js";
import Api from "./components/Api.js";
import { config } from "./config.js";
import '../style.css';

const api = new Api();
const bookList = new BookList(setBooks, createBook, config);
const cartCounter = document.querySelector('.cart-counter');
bookList.setListeners();


function setBooks(category) {
    api.getBooks(config.end, category).then(({items}) => {
        bookList.renderBooks(items);
    }).catch(error => {
        console.log(error)
    })
}

cartCounter.textContent = localStorage.getItem('cart') || 0;

if (+cartCounter.textContent === 0 ){
        cartCounter.style.display = 'none';
    } else {
        cartCounter.style.display = 'block';
    }

function createBook(data) {
    const bookCard = new BookCard(data, config);
    bookCard.render();
}

bookList.setBooks('Architecture');


document.addEventListener("DOMContentLoaded", initSlider);