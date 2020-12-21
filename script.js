let books = [];
let add = document.querySelector('#btn_add');
let formInput = document.querySelector('.forminput');
let overlay = document.querySelector('.overlay');
let btnCancel = document.querySelector('#btn_cancel');
let btnAddBook = document.querySelector('#btn_addbook');
let bookShelf = document.querySelector('.container');
let info = document.querySelector('.info');

checkLocalStorage();
updateLocalStorage();

function Books(title, author, pages) {
    this.title = title;
    this.pages = pages;
    this.author = author;
};
function Book(read) {
    this.read = read
}

function addBookToLibrary() {
    if (document.querySelector('form input[placeholder="Title"]').value !== '' &&
        document.querySelector('form input[placeholder="author"]').value !== '' &&
        document.querySelector('form input[type="number"]').value !== '') {
        Book.prototype = Object.create(Books.prototype)
        const newBook = new Book;
        newBook.title = document.querySelector('form input[placeholder="Title"]').value;
        newBook.author = document.querySelector('form input[placeholder="author"]').value;
        newBook.numberOfPages = document.querySelector('form input[type="number"]').value;
        newBook.read = document.querySelector('form input[type="checkbox"]').checked;
        books.push(newBook);
        updateLocalStorage();
        document.querySelector('form input[placeholder="Title"]').value = '';
        document.querySelector('form input[placeholder="author"]').value = '';
        document.querySelector('form input[type="number"]').value = '';
        document.querySelector('form input[type="checkbox"]').checked = false;
        formInput.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
        info.textContent = '';
    } else {
        info.textContent = "There is nothing to add, fill in some Text"
    }
}
function addBooksToHTML() {
    while (bookShelf.children.length > 0) {
        bookShelf.children[0].remove();
    }
    createHTML();
}

function createHTML() {
    for (let i in books) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = i;
        const heading = document.createElement('h3');
        const title = books[i].title;
        heading.textContent = title;
        card.appendChild(heading);
        const subAuthor = document.createElement('span');
        const author = books[i].author;
        subAuthor.textContent = author;
        card.appendChild(subAuthor);
        const subPages = document.createElement('span');
        const pages = books[i].numberOfPages;
        subPages.textContent = 'Pages: ' + pages;
        card.appendChild(subPages);
        const subRead = document.createElement('span');
        const read = books[i].read;
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
        bookShelf.appendChild(card);
    }
}
window.addEventListener('click', (e) => {
    let element = e.target

    if (element.classList.contains('far')) {
        dataNr = Object.assign({}, element.parentElement.parentElement.dataset);
        element.parentElement.parentElement.remove();
        books.splice(dataNr.index, 1);
        updateLocalStorage();
    }
    if (element.classList.contains('fas')) {
        dataNr = Object.assign({}, element.parentElement.parentElement.dataset);
        if (books[dataNr.index].read === true) {
            books[dataNr.index].read = false;
            element.parentElement.parentElement.children[3].textContent = 'Read: false';
            element.parentElement.parentElement.children[3].style.color = 'red';
            updateLocalStorage();
        } else {
            books[dataNr.index].read = true;
            element.parentElement.parentElement.children[3].textContent = 'Read: true';
            element.parentElement.parentElement.children[3].style.color = 'lightgreen';
            updateLocalStorage();
        }
    }
})

add.addEventListener('click', () => {
    formInput.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
})

btnCancel.addEventListener('click', (e) => {
    e.preventDefault();
    formInput.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
})
btnAddBook.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary();
    addBooksToHTML();
})

function checkLocalStorage() {
    if (localStorage.getItem("library")) {
        books = JSON.parse(localStorage.getItem("library"));
        addBooksToHTML();
    } else {
        books = [];
    }
}

function updateLocalStorage() {
    localStorage.setItem("library", JSON.stringify(books));
}

function storageAvailable(type) {
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

