let books = [];
let add = document.querySelector('#btn_add');
let formInput = document.querySelector('.forminput');
let overlay = document.querySelector('.overlay');
let btnCancel = document.querySelector('#btn_cancel')
let btnAddBook = document.querySelector('#btn_addbook')

function Books(title, author, pages, read) {
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.author = author;
};

add.addEventListener('click', ()=>{
    formInput.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
})

btnCancel.addEventListener('click', (e)=>{
    e.preventDefault();
    formInput.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
})
btnAddBook.addEventListener('click', (e)=>{
    e.preventDefault();
})