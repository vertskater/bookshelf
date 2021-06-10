let books = [];
let add = document.querySelector('#btn_add');
let formInput = document.querySelector('.forminput');
let overlay = document.querySelector('.overlay');
let btnCancel = document.querySelector('#btn_cancel');
let btnAddBook = document.querySelector('#btn_addbook');
let bookShelf = document.querySelector('.container');
let info = document.querySelector('.info');

function Book(title, author, pages, read) {
    this.title = title;
    this.pages = pages;
    this.author = author;
    this.read = read
};


function addBookToLibrary() {
    if (document.querySelector('form input[placeholder="Title"]').value !== '' &&
        document.querySelector('form input[placeholder="author"]').value !== '' &&
        document.querySelector('form input[type="number"]').value !== '') {
        const newBook = new Book;
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
        if(read){
            subRead.style.color = 'lightgreen';
        }else{
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
const changeBookHTML = (rootElement, event) => {
    rootElement.addEventListener(event, (e) => {
        let targetElement = e.target;
        while(targetElement != null) {
            if (targetElement.matches('.far')) {
                dataNr = Object.assign({}, targetElement.parentElement.parentElement.dataset);
                targetElement.parentElement.parentElement.remove();
                books.splice(dataNr.index, 1);
            }
            if (targetElement.matches('.fas')) {
                dataNr = Object.assign({}, targetElement.parentElement.parentElement.dataset);
                if (books[dataNr.index].read) {
                    books[dataNr.index].read = false;
                    targetElement.parentElement.parentElement.children[3].textContent = 'Read: false';
                    targetElement.parentElement.parentElement.children[3].style.color = 'red';
                } else {
                    books[dataNr.index].read = true;
                    targetElement.parentElement.parentElement.children[3].textContent = 'Read: true';
                    targetElement.parentElement.parentElement.children[3].style.color = 'lightgreen';
                }
            }
            targetElement = targetElement.parentElement;
        }
    }, true)
}
changeBookHTML(bookShelf, 'click');

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
    addBooksToHTML();
})


