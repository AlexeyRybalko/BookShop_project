export default class BookList {
    constructor(setBooks, render, config) {
        this.render = render;
        this.bookList = document.querySelector('.book-list');
        this.category = 'Architecture';
        this.setBooks = setBooks;
        this.config = config;
    }

    setListeners(){
        const loadMoreButton =  document.querySelector('.load-more-button');
        const burgerMenu = document.querySelector('.burger-menu');
        const categoryList = document.querySelector('.category-list');

        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            categoryList.classList.toggle('active');
        });

        document.querySelectorAll('.category-list__link').forEach(el => {
            el.addEventListener('click', (evt) => {
                evt.preventDefault();
                this.category = evt.target.dataset.category;
                this.config.end = 6;
                loadMoreButton.style.display = 'block';
                this.setBooks(this.category);
                document.querySelector('.category-list__item.active').classList.remove('active');
                evt.target.parentNode.classList.add('active');
                categoryList.classList.remove('active');
                burgerMenu.classList.remove('active');
            });
        });
        
        loadMoreButton.addEventListener('click', (evt) =>{

            if (this.config.end + 6 > 40) {
                this.config.end += 40 - this.config.end;
                evt.target.style.display = 'none';
            } else {
                this.config.end += 6;
            }

            this.setBooks(this.category);
        })
    }

    renderBooks(booksData){
        this.bookList.innerHTML = '';
        
        booksData.forEach(book => {
            this.render(book);
        });
    }

}