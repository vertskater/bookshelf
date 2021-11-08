"use strict";
const getId = (() => {
  let count = 0;
  return () => {
    count++;
    return count;
  };
})();

const booksModule = {
  books: [],
  events: {},

  /**
   *
   * @param {string} bookTitle
   * @param {string} author
   * @param {number} pages
   * @param {boolean} read
   */
  addBook(bookTitle, author, pages, read) {
    const newBook = {
      id: getId(),
      title: bookTitle,
      author: author,
      pages: pages,
      read: read,
    };
    this.books.push(newBook);
    this.emit("add", newBook);
  },
  /**
   *
   * @param {number} id
   */
  changeReadStatusToRead(id) {
    this.books.forEach((book) => {
      if (book.id === id && book.read === false) {
        book.read = true;
        this.emit("changeRead", book);
      }
    });
  },
  /**
   *
   * @param {number} id
   */
  changeReadStatusToNotRead(id) {
    this.books.forEach((book) => {
      if (book.id === id && book.read === true) {
        book.read = false;
        this.emit("changeRead", book);
      }
    });
  },
  /**
   *
   * @param {number} id
   */
  deleteBooks(id) {
    this.books.forEach((book, index) => {
      if (book.id === id) {
        this.books.splice(index, 1);
        this.emit("delete", book);
      }
    });
  },
  /**
   * @param {string} eventName
   * @param {*=} param
   */
  emit(eventName, param) {
    if (eventName in this.events) {
      this.events[eventName].forEach((f) => {
        f(param);
      });
    }
  },
  /**
   *
   * @param {string} eventName
   * @param {function} cb
   */
  on(eventName, cb) {
    if (!(eventName in this.events)) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(cb);
  },
};

/*DOM manipulation starts here!
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    btnAdd: document.querySelector("#btn_add"),
    form: document.querySelector(".forminput"),
    overlay: document.querySelector(".overlay"),
    btnCancel: document.querySelector("#btn_cancel"),
    btnAddBook: document.querySelector("#btn_addbook"),
    bookTitleInput: document.querySelector(".book-title"),
    bookAuthorInput: document.querySelector(".author"),
    bookPagesInput: document.querySelector(".pages"),
    bookReadStatus: document.querySelector(".read-status"),
    bookshelf: document.querySelector(".container"),
  };
  //Toggle InputForm and Oberlay
  elements.btnAdd.addEventListener("click", () => {
    elements.form.classList.toggle("hidden");
    elements.overlay.classList.add("hidden");
  });
  elements.btnCancel.addEventListener("click", () => {
    elements.form.classList.add("hidden");
    elements.overlay.classList.remove("hidden");
  });
  //add book to module
  elements.btnAddBook.addEventListener("click", () => {
    const bookTitle = elements.bookTitleInput.value;
    const author = elements.bookAuthorInput.value;
    const pages = elements.bookPagesInput.value;
    const read = elements.bookReadStatus.checked ? true : false;
    if (bookTitle != "" || author != "" || pages != "") {
      booksModule.addBook(bookTitle, author, pages, read);
      elements.form.classList.add("hidden");
      elements.overlay.classList.remove("hidden");
    }
    elements.bookTitleInput.value = "";
    elements.bookAuthorInput.value = "";
    elements.bookPagesInput.value = "";
  });
  booksModule.on("add", (book) => {
    //create HTML for BookCard
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = book.id;
    const heading = document.createElement("h3");
    const title = book.title;
    heading.textContent = title;
    card.appendChild(heading);
    const subAuthor = document.createElement("span");
    const author = book.author;
    subAuthor.textContent = author;
    card.appendChild(subAuthor);
    const subPages = document.createElement("span");
    const pages = book.pages;
    subPages.textContent = "Pages: " + pages;
    card.appendChild(subPages);
    const subRead = document.createElement("span");
    const read = book.read;
    subRead.textContent = "Read: " + read;
    read ? (subRead.style.color = "lightgreen") : (subRead.style.color = "red");
    card.appendChild(subRead);
    const icons = document.createElement("div");
    icons.classList.add("icon-pack");
    card.appendChild(icons);
    let iconTrash = document.createElement("i");
    iconTrash.classList.add("far");
    iconTrash.classList.add("fa-trash-alt");
    icons.appendChild(iconTrash);
    let iconBook = document.createElement("i");
    iconBook.classList.add("fas");
    iconBook.classList.add("fa-book-reader");
    icons.appendChild(iconBook);
    elements.bookshelf.appendChild(card);
    //Eventlistener to change and remove Books
    iconTrash.addEventListener("click", () => {
      booksModule.deleteBooks(book.id);
    });
    iconBook.addEventListener("click", () => {
      if (book.read) {
        booksModule.changeReadStatusToNotRead(book.id);
      } else {
        booksModule.changeReadStatusToRead(book.id);
      }
    });
  });
  booksModule.on("delete", (book) => {
    const bookCard = elements.bookshelf.querySelector(
      "div[data-index='" + book.id + "']"
    );
    bookCard.remove();
  });
  booksModule.on("changeRead", (book) => {
    const bookCard = elements.bookshelf.querySelector(
      "div[data-index='" + book.id + "']"
    );
    const isRead = bookCard.querySelector(":nth-child(4)");
    if (book.read) {
      isRead.textContent = "Read: " + book.read;
      isRead.style.color = "green";
    } else {
      isRead.textContent = "Read: " + book.read;
      isRead.style.color = "red";
    }
  });
});
