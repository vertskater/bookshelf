class Book {
    construktor(title, author, pages, read) {
        this.title = title;
        this.pages = pages;
        this.author = author;
        this.read = read;

    };

}

class Bookshelf {
    constructor() {
        this.books = [];
        this.add = document.querySelector('#btn_add');
        this.formInput = document.querySelector('.forminput');
        this.overlay = document.querySelector('.overlay');
        this.btnCancel = document.querySelector('#btn_cancel');
        this.btnAddBook = document.querySelector('#btn_addbook');
        this.bookShelf = document.querySelector('.container');
        this.info = document.querySelector('.info');
    }

    addBookToLibrary() {
        if (document.querySelector('form input[placeholder="Title"]').value !== '' &&
            document.querySelector('form input[placeholder="author"]').value !== '' &&
            document.querySelector('form input[type="number"]').value !== '') {
            //Book.prototype = Object.create(Books.prototype)
            const newBook = new Book;
            newBook.title = document.querySelector('form input[placeholder="Title"]').value;
            newBook.author = document.querySelector('form input[placeholder="author"]').value;
            newBook.numberOfPages = document.querySelector('form input[type="number"]').value;
            newBook.read = document.querySelector('form input[type="checkbox"]').checked;
            this.books.push(newBook);
            this.updateLocalStorage();
            document.querySelector('form input[placeholder="Title"]').value = '';
            document.querySelector('form input[placeholder="author"]').value = '';
            document.querySelector('form input[type="number"]').value = '';
            document.querySelector('form input[type="checkbox"]').checked = false;
            this.formInput.classList.toggle('hidden');
            this.overlay.classList.toggle('hidden');
            this.info.textContent = '';
        } else {
            this.info.textContent = "There is nothing to add, fill in some Text"
        }
        this.addBooksToHTML();
    }
    
    addBooksToHTML() {
        while (this.bookShelf.children.length > 0) {
            this.bookShelf.children[0].remove();
        }
        this.createHTML();
    }

    createHTML() {
        for (let i in this.books) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.index = i;
            const heading = document.createElement('h3');
            const title = this.books[i].title;
            heading.textContent = title;
            card.appendChild(heading);
            const subAuthor = document.createElement('span');
            const author = this.books[i].author;
            subAuthor.textContent = author;
            card.appendChild(subAuthor);
            const subPages = document.createElement('span');
            const pages = this.books[i].numberOfPages;
            subPages.textContent = 'Pages: ' + pages;
            card.appendChild(subPages);
            const subRead = document.createElement('span');
            const read = this.books[i].read;
            subRead.textContent = 'Read: ' + read;
            if (read === true) {
                subRead.style.color = 'lightgreen';
            } else {
                subRead.style.color = 'red';
            }
            card.appendChild(subRead);
            const icons = document.createElement('div');
            icons.classList.add('icon-pack');
            card.appendChild(icons);
            let iconTrash = document.createElement('i');
            iconTrash.classList.add('far')
            iconTrash.classList.add('fa-trash-alt');
            icons.appendChild(iconTrash);
            let iconBook = document.createElement('i');
            iconBook.classList.add('fas');
            iconBook.classList.add('fa-book-reader');
            icons.appendChild(iconBook);
            this.bookShelf.appendChild(card);
        }
    }
    checkLocalStorage() {
        if (localStorage.getItem("library")) {
            this.books = JSON.parse(localStorage.getItem("library"));
            this.addBooksToHTML();
        } else {
            this.books = [];
        }
    }
    
    updateLocalStorage() {
        localStorage.setItem("library", JSON.stringify(this.books));
    }
    
    storageAvailable(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }
}



let bookShelf = new Bookshelf;
bookShelf.storageAvailable();
bookShelf.addBookToLibrary()
bookShelf.checkLocalStorage();
bookShelf.updateLocalStorage();


window.addEventListener('click', (e) => {
    let element = e.target

    if (element.classList.contains('far')) {
        dataNr = Object.assign({}, element.parentElement.parentElement.dataset);
        element.parentElement.parentElement.remove();
        bookShelf.books.splice(dataNr.index, 1);
        bookShelf.updateLocalStorage();
    }
    if (element.classList.contains('fas')) {
        dataNr = Object.assign({}, element.parentElement.parentElement.dataset);
        if (bookShelf.books[dataNr.index].read === true) {
            bookShelf.books[dataNr.index].read = false;
            element.parentElement.parentElement.children[3].textContent = 'Read: false';
            element.parentElement.parentElement.children[3].style.color = 'red';
            bookShelf.updateLocalStorage();
        } else {
            bookShelf.books[dataNr.index].read = true;
            element.parentElement.parentElement.children[3].textContent = 'Read: true';
            element.parentElement.parentElement.children[3].style.color = 'lightgreen';
            bookShelf.updateLocalStorage();
        }
    }
})

bookShelf.add.addEventListener('click', () => {
    bookShelf.formInput.classList.toggle('hidden');
    bookShelf.overlay.classList.toggle('hidden');
})

bookShelf.btnCancel.addEventListener('click', (e) => {
    e.preventDefault();
    bookShelf.formInput.classList.toggle('hidden');
    bookShelf.overlay.classList.toggle('hidden');
})
bookShelf.btnAddBook.addEventListener('click', (e) => {
    e.preventDefault();
    bookShelf.addBookToLibrary();
    //bookShelf.addBooksToHTML();
})










