// book array
const myLibrary = [];

// constructor
function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead

    this.info = function () {
        console.log(`
            Book ID: ${this.id}
            Title:   ${this.title}
            Author:  ${this.author}
            Pages:   ${this.pages}
            Read:    ${this.isRead ? "Yes" : "No"}
            `);
    };

    this.detail = function () {
        return [
            `Title: ${this.title}`,
            `Author: ${this.author}`,
            `Pages: ${this.pages}`,
            `Read: ${this.isRead ? "Yes" : "No"}`
        ];
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);

    myLibrary.push(newBook);
}

function logBooks() {
    for (let book of myLibrary) {
        book.info();
    }
}

const bookDisplayContainer = document.getElementById('book-container');

function createBookDisplay(book) {
    const mainContainer = makeElement("div");
    mainContainer.classList.add("book-card");

    // Info
    const listParent = makeElement("ul");
    book.detail().forEach(text => listParent.appendChild(makeElement("li", text)));

    mainContainer.appendChild(listParent);

    // Buttons
    const btnContainer = makeElement("div");
    btnContainer.classList.add("btn-container");

    const toggleBtn = makeElement("button", "Toggle Read");
    const removeBtn = makeElement("button", "Remove");
    [toggleBtn, removeBtn].forEach(btn => btnContainer.appendChild(btn));

    mainContainer.appendChild(btnContainer);

    // Add to display
    bookDisplayContainer.appendChild(mainContainer);
}

function makeElement(type, content = "") {
    const element = document.createElement(type);
    if (content) element.innerText = content;
    return element;
}

function displayBooks() {
    for (let book of myLibrary) {
        createBookDisplay(book);
    }
}

addBookToLibrary("The Silent Horizon", "Mira Collins", 324, true);
addBookToLibrary("Shadows of the Valley", "Ethan Ward", 198, false);
addBookToLibrary("Journey Beyond the Stars", "Aisha Khan", 412, true);

// logBooks();
displayBooks();