let books = [];
let add = document.querySelector('#btn_add');
let formInput = document.querySelector('.forminput');
let overlay = document.querySelector('.overlay');
let btnCancel = document.querySelector('#btn_cancel');
let btnAddBook = document.querySelector('#btn_addbook');
let bookShelf = document.querySelector('.container');
let info = document.querySelector('.info');

function Books(title, author, pages, read) {
    this.title = title;
    this.pages = pages;
    this.author = author;
    this.read = read
};
// function Book(read) {
//     this.read = read
// }

function addBookToLibrary() {
    if (document.querySelector('form input[placeholder="Title"]').value !== '' ||
        document.querySelector('form input[placeholder="author"]').value !== '' ||
        document.querySelector('form input[type="number"]').value !== '') {
        const newBook = Object.create(Books);
        newBook.title = document.querySelector('form input[placeholder="Title"]').value;
        newBook.author = document.querySelector('form input[placeholder="author"]').value;
        newBook.numberOfPages = document.querySelector('form input[type="number"]').value;
        newBook.read = document.querySelector('form input[type="checkbox"]').checked;
        books.push(newBook);
        document.querySelector('form input[placeholder="Title"]').value = '';
        document.querySelector('form input[placeholder="author"]').value = '';
        document.querySelector('form input[type="number"]').value = '';
        document.querySelector('form input[type="checkbox"]').checked = false;

        formInput.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
        info.textContent = '';
    } else {
        info.textContent = "Use the textfields to type some Text"
    }
}
function addBooksToHTML() {
    while(bookShelf.children.length > 0){
        bookShelf.children[0].remove();
    }
    createHTML();
}
function createHTML() {
    let card = '';
    console.log(card);
}


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
    addBookToLibrary()
    console.table(books);
    addBooksToHTML();
})

