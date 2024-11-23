import type { EventListener } from './Event'
import type { Book } from './LibraryCatalog'

class User implements EventListener {
  firstname: string
  lastname: string
  maxBooksAllowed: number // How many books can be borrowed at the same time

  constructor(firstname: string, lastname: string, maxBooksAllowed: number) {
    this.firstname = firstname
    this.lastname = lastname
    this.maxBooksAllowed = maxBooksAllowed
  }

  sayHi() {
    console.log(
      `Hi, my name is ${this.firstname} ${this.lastname}, I'm a ${this.constructor.name} and I can borrow ${this.maxBooksAllowed} books at the same time.`
    )
  }

  update(event: string, book: Book) {
    console.log(
      `${this.constructor.name} ${this.firstname} ${this.lastname} received an event: ${event}, book: ${book.title}`
    )
  }
}

class Student extends User {
  group: string | undefined

  constructor(firstname: string, lastname: string, maxBooksAllowed: number) {
    super(firstname, lastname, maxBooksAllowed)
  }
}

class Teacher extends User {
  classTeacherGroup: string | undefined

  constructor(firstname: string, lastname: string, maxBooksAllowed: number) {
    super(firstname, lastname, maxBooksAllowed)
  }
}

class Librarian extends User {
  constructor(firstname: string, lastname: string, maxBooksAllowed: number) {
    super(firstname, lastname, maxBooksAllowed)
  }
}

type UserTypes = 'student' | 'teacher' | 'librarian'

export class UserFactory {
  static createUser(type: UserTypes, firstname: string, lastname: string) {
    switch (type) {
      case 'student':
        return new Student(firstname, lastname, 5)
      case 'teacher':
        return new Teacher(firstname, lastname, 10)
      case 'librarian':
        return new Librarian(firstname, lastname, Infinity)
      default:
        throw new Error('Invalid user type')
    }
  }
}
