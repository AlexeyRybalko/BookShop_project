export default class BookCard {
    constructor (data, config) {
        this.data = data;
        this.cover = data.volumeInfo.imageLinks?.thumbnail || '/PNG/default-book-cover.png';
        this.authors = data.volumeInfo.authors;
        this.title = data.volumeInfo.title;
        this.rating = data.volumeInfo.averageRating;
        this.ratingCount = data.volumeInfo.ratingsCount;
        this.description = data.volumeInfo.description;
        this.price = data.saleInfo.retailPrice;
        this.item = document.querySelector('.book-card-template').content.cloneNode(true);
        this.config = config;
        this.inCart = false;
        this.buyButton = this.item.querySelector('.library-button');
        this.id = data.id;
        }

    fillData(){
        if (!this.ratingCount || !this.rating) {
            this.item.querySelector('.book-card__rating').remove();
            this.ratingCount = null;
            this.rating = null;
        } else {
            this.item.querySelector('.book-card__rating_reviews').textContent = this.ratingCount + ' review';
            this.fillStars();
        }

        const storage = JSON.parse(localStorage.getItem('buyButton')) || [];
        storage.forEach(el => {
            this.inCart = this.id === el.id ? el.inCart : this.inCart;
        });

        if (this.inCart) {
            this.buyButton.classList.add('in-the-cart-button');
            this.buyButton.textContent = 'in the cart';
        } else if(!this.price) {
            this.buyButton.disabled = true;
            this.buyButton.classList.add('in-the-cart-button');
            this.buyButton.textContent = 'not for sale';
            this.buyButton.style.cursor = 'default';
        }

        this.item.querySelector('.book-card__cover-image').src = this.cover;
        this.item.querySelector('.book-card__text_author').textContent = this.authors?.join(', ');
        this.item.querySelector('.book-card__text_title').textContent = this.title;
        this.item.querySelector('.book-card__text_description-content').textContent = this.description;
        this.item.querySelector('.book-card__text_price').textContent = this.price ? `${this.price.amount} ${this.price.currencyCode}` : 'NOT FOR SALE';
    }

    fillStars(){
        const stars = this.item.querySelector('.book-card__rating_stars');

        for (let i = 1;  i <= 5; i++ ) {
            if (i <= Math.round(this.rating)) {
                stars.innerHTML += '<img class="star-icon" src="./SVG/Star-yellow.svg" alt="Star-yellow">'
            } else {
                stars.innerHTML += '<img class="star-icon" src="./SVG/Star-white.svg" alt="Star-white">'
            }
        }
    }

    addToCart(){
        this.buyButton.classList.toggle('in-the-cart-button')
        const cartCounter = document.querySelector('.cart-counter');

        if (!this.inCart) {
            this.buyButton.textContent = 'in the cart';
            this.config.cart++;
        } else {
            this.buyButton.textContent = 'buy now';
            this.config.cart--
        }

        this.inCart = !this.inCart;

        cartCounter.textContent = this.config.cart;

        if (+this.config.cart === 0 ){
            cartCounter.style.display = 'none';
        } else {
            cartCounter.style.display = 'block';
        }

        this.setLocalStorage();
    }

    setLocalStorage(){
        
        let storage = JSON.parse(localStorage.getItem('buyButton')) || [];
        
        if (storage.length) {
            storage = storage.filter(el => this.id !== el.id);
        }

        storage.push({
            id: this.id,
            inCart: this.inCart,
        })

        localStorage.setItem('cart', this.config.cart.toString());
        localStorage.setItem('buyButton', JSON.stringify(storage))

    }

    render(){
        this.buyButton.addEventListener('click', () => {
            this.addToCart();
        })

        this.fillData();
        document.querySelector('.book-list').append(this.item);
    }

}