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

addBookToLibrary("The Silent Horizon", "Mira Collins", 324, true);
addBookToLibrary("Shadows of the Valley", "Ethan Ward", 198, false);
addBookToLibrary("Journey Beyond the Stars", "Aisha Khan", 412, true);

logBooks();