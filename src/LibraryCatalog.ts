export class Book {
  constructor(public title: string, public author: string) {}

  toString() {
    return `${this.title} by ${this.author}`;
  }
}

export class LibraryCatalog {
  private static instance: LibraryCatalog;
  private books: Book[] = [];

  private constructor() {}

  static getInstance(): LibraryCatalog {
    if (!LibraryCatalog.instance) {
      LibraryCatalog.instance = new LibraryCatalog();
    }
    return LibraryCatalog.instance;
  }

  sayHi() {
    console.log("Hi");
  }

  addBook(book: Book) {
    this.books.push(book);
  }

  printBooks() {
    for (const [idx, book] of this.books.entries()) {
      console.log(`${idx + 1}. ${book.toString()}`);
    }
  }
}
