import { ExternalDataService } from "./externalDataService";
import {
  Book,
  CsvBookAdapter,
  LibraryCatalog,
  XmlBookAdapter,
} from "./LibraryCatalog";
import { addNewBook, printBooks } from "./utils";

const externalDataService = new ExternalDataService();

// 1. Create a Singleton class and demonstrate how to access it from different parts of the program.
console.log(" 1. Singleton - LibraryCatalog");
const newBook1 = new Book("Design Patterns", "Alexander Shvets");
const newBook2 = new Book("Przepis na człowieka", "Dawid Myśliwiec");
addNewBook(newBook1); // Instance created
addNewBook(newBook2); // Instance reused
printBooks(); // Also reuses the same instance

// 2. Implement an adapter pattern that can read book data from various
//    formats (JSON, XML, CSV) and convert it into a standard format.
console.log(" 2. Adapter - CsvBookAdapter, XmlBookAdapter");
const libraryCatalog = LibraryCatalog.getInstance();
const jsonData = externalDataService.fetchJsonData();
libraryCatalog.import(jsonData);
console.log("JSON data imported:");
printBooks();
const csvData = externalDataService.fetchCsvData();
const csvAdapter = new CsvBookAdapter(libraryCatalog);
csvAdapter.import(csvData);
console.log("CSV data imported using CsvBookAdapter:");
printBooks();
const xmlData = externalDataService.fetchXmlData();
const xmlAdapter = new XmlBookAdapter(libraryCatalog);
xmlAdapter.import(xmlData);
console.log("XML data imported using CsvBookAdapter:");
printBooks();
