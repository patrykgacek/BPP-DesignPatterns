import { LibraryCatalog, type Book } from './LibraryCatalog'

export const addNewBook = (book: Book) => {
  console.log(`Adding book: ${book.title}`)
  const instance = LibraryCatalog.getInstance()
  instance.addBook(book)
}

export const printBooks = () => {
  console.log('Displaying all books:')
  const instance = LibraryCatalog.getInstance()
  instance.printBooks()
}
