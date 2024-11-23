import { Book, CsvBookAdapter, LibraryCatalog, XmlBookAdapter } from './LibraryCatalog'
import { addNewBook, printBooks } from './utils'
import { ExternalDataService } from './ExternalDataService'
import { UserFactory } from './User'

const externalDataService = new ExternalDataService()

// +---------------------------------------------------------------------------+
// | 1. Create a Singleton class and demonstrate how to access it from         |
// |    different parts of the program.                                        |
// +---------------------------------------------------------------------------+
console.log(' [1] Singleton - LibraryCatalog')
const designPatternBook = new Book('Design Patterns', 'Alexander Shvets')
const HumanRecipeBook = new Book('Przepis na człowieka', 'Dawid Myśliwiec')
addNewBook(designPatternBook) // Instance created
addNewBook(HumanRecipeBook) // Instance reused
printBooks() // Also reuses the same instance

// +---------------------------------------------------------------------------+
// | 2. Implement an adapter pattern that can read book data from various       |
// |    formats (JSON, XML, CSV) and convert it into a standard format.         |
// +---------------------------------------------------------------------------+
// PG: I am not sure if this adapter pattern is implemented correctly 😅.
console.log('\n\n\n', '[2] Adapter - CsvBookAdapter, XmlBookAdapter')
const libraryCatalog = LibraryCatalog.getInstance()

// JSON
const jsonData = externalDataService.fetchJsonData()
libraryCatalog.import(jsonData)
console.log('JSON data imported:')
printBooks()

// CSV
const csvData = externalDataService.fetchCsvData()
const csvAdapter = new CsvBookAdapter(libraryCatalog)
csvAdapter.import(csvData)
console.log('CSV data imported using CsvBookAdapter:')
printBooks()

// XML
const xmlData = externalDataService.fetchXmlData()
const xmlAdapter = new XmlBookAdapter(libraryCatalog)
xmlAdapter.import(xmlData)
console.log('XML data imported using CsvBookAdapter:')
printBooks()

// +---------------------------------------------------------------------------+
// | 3. Create a factory method to generate different types of users           |
// |    and demonstrate how the factory enables flexible object creation.      |
// +---------------------------------------------------------------------------+
console.log('\n\n\n', '[3] Factory - User')
const studentJohn = UserFactory.createUser('student', 'John', 'Doe')
const teacherJane = UserFactory.createUser('teacher', 'Jane', 'Smith')
const librarianAlice = UserFactory.createUser('librarian', 'Alice', 'Brown')
studentJohn.sayHi()
teacherJane.sayHi()
librarianAlice.sayHi()

// +---------------------------------------------------------------------------+
// | 4. Implement the Observer pattern to notify users about specific events   |
// |    (e.g., a book they want becomes available).                            |
// +---------------------------------------------------------------------------+
console.log('\n\n\n', '[4] Observer - User')
libraryCatalog.eventManager.subscribe('borrow', designPatternBook, studentJohn)
libraryCatalog.eventManager.subscribe('return', designPatternBook, teacherJane)

libraryCatalog.removeBook(designPatternBook)
libraryCatalog.addBook(designPatternBook)
