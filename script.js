// DOM Elements
const bookDisplayContainer = document.getElementById('book-container');
const showDialogBtn = document.getElementById('show-dialog-btn');
const closeDialogBtn = document.getElementById('close-dialog-btn');
const dialogElement = document.getElementById('add-book-dialog');
const bookForm = document.querySelector("dialog form");


// Event Handling
showDialogBtn.addEventListener("click", () => {
    dialogElement.showModal();
});

closeDialogBtn.addEventListener("click", () => {
    bookForm.reset();
    dialogElement.close();
})

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = bookForm.querySelector("#title").value;
    const author = bookForm.querySelector("#author").value;
    const pages = bookForm.querySelector("#pages").value;
    const isRead = bookForm.querySelector("#read").checked;

    addBookToLibrary(title, author, pages, isRead);
    createBookDisplay(myLibrary.at(-1));

    bookForm.reset();
    dialogElement.close();
});

// book array
const myLibrary = [];

// constructor
class Book {
    constructor(title, author, pages, isRead) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
    toggleRead() {
        this.isRead = !this.isRead;
    };
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

function createBookDisplay(book) {
    const bookContainer = makeElement("div");
    bookContainer.classList.add("book-card");
    bookContainer.setAttribute("data-book-id", book.id);

    // Info
    const listParent = makeElement("ul");
    const titleLi = makeElement("li", `Title: ${book.title}`);
    const authorLi = makeElement("li", `Author: ${book.author}`);
    const pagesLi = makeElement("li", `Pages: ${book.pages}`);
    const readLi = makeElement("li", `Read: ${book.isRead ? "Yes" : "No"}`);
    listParent.append(titleLi, authorLi, pagesLi, readLi);

    // Buttons
    const btnContainer = makeElement("div");
    btnContainer.classList.add("btn-container");
    const toggleBtn = makeElement("button", "Toggle Read");
    const removeBtn = makeElement("button", "Remove");
    btnContainer.append(toggleBtn, removeBtn);

    // Add to display
    bookContainer.append(listParent, btnContainer);
    bookDisplayContainer.appendChild(bookContainer);

    // Hook events
    removeBtn.addEventListener("click", () => {
        removeBook(bookContainer);
    });
    toggleBtn.addEventListener("click", () => {
        book.toggleRead();
        readLi.innerText = `Read: ${book.isRead ? "Yes" : "No"}`;
    });
}

function makeElement(type, content = "") {
    const element = document.createElement(type);
    if (content) element.innerText = content;
    return element;
}

function displayBooks() {
    myLibrary.forEach(book => createBookDisplay(book));
}

function removeBook(element) {
    const targetId = element.dataset.bookId;
    if (targetId) {
        const index = myLibrary.findIndex(book => book.id === targetId);
        if (index !== -1) {
            myLibrary.splice(index, 1);
            element.remove();
        }
    }
}

addBookToLibrary("The Silent Horizon", "Mira Collins", 324, true);
addBookToLibrary("Shadows of the Valley", "Ethan Ward", 198, false);
addBookToLibrary("Journey Beyond the Stars", "Aisha Khan", 412, true);

displayBooks();