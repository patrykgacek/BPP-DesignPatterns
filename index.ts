import { Book } from "./libraryCatalog";
import { addNewBook, printBooks } from "./utils";

// 1. Create a Singleton class and demonstrate how to access it from different parts of the program.
console.log(" 1. Singleton - LibraryCatalog");
const newBook1 = new Book("Design Patterns", "Alexander Shvets");
const newBook2 = new Book("Przepis na człowieka", "Dawid Myśliwiec");
addNewBook(newBook1); // Instance created
addNewBook(newBook2); // Instance reused
printBooks(); // Also reuses the same instance
