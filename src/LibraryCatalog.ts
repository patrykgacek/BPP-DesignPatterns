import { XMLParser } from 'fast-xml-parser'

import { EventManager } from './Event'

export class Book {
  constructor(
    public title: string,
    public author: string
  ) {}

  toString() {
    return `${this.title} by ${this.author}`
  }
}

export class LibraryCatalog {
  private static instance: LibraryCatalog
  private books: Book[] = []
  public eventManager: EventManager = new EventManager()

  private constructor() {}

  static getInstance(): LibraryCatalog {
    if (!LibraryCatalog.instance) {
      LibraryCatalog.instance = new LibraryCatalog()
    }
    return LibraryCatalog.instance
  }

  sayHi() {
    console.log('Hi')
  }

  addBook(book: Book) {
    this.books.push(book)
    console.log(`Book: "${book.title}" added to the catalog`)
    this.eventManager.notify('borrow', book)
  }

  removeBook(book: Book) {
    const index = this.books.indexOf(book)
    if (index > -1) {
      this.books.splice(index, 1)
      console.log(`Book: "${book.title}" removed from the catalog`)
      this.eventManager.notify('return', book)
    } else {
      console.log('Book not found')
    }
  }

  printBooks() {
    console.table(this.books)
  }

  import(jsonData: string) {
    const data = JSON.parse(jsonData)
    for (const item of data) {
      this.addBook(new Book(item.title, item.author))
    }
  }
}

interface BookDataAdapter {
  import(data: string): void
}

export class CsvBookAdapter implements BookDataAdapter {
  private catalog: LibraryCatalog

  constructor(catalog: LibraryCatalog) {
    this.catalog = catalog
  }

  import(csvData: string) {
    const data = csvData.split('\n').slice(1)
    for (const item of data) {
      const [title, author] = item.split(',')
      this.catalog.addBook(new Book(title, author))
    }
  }
}

export class XmlBookAdapter implements BookDataAdapter {
  private catalog: LibraryCatalog

  constructor(catalog: LibraryCatalog) {
    this.catalog = catalog
  }

  import(xmlData: string) {
    const parser = new XMLParser()
    const jObj = parser.parse(xmlData)
    const books = jObj.books.book
    for (const book of books) {
      this.catalog.addBook(new Book(book.title, book.author))
    }
  }
}
