import type { Book } from './LibraryCatalog'

type EventTypes = 'borrow' | 'return'

export interface EventListener {
  update(event: EventTypes, book: Book): void
}

export class EventManager {
  private listeners: Map<EventTypes, Map<Book, EventListener[]>> = new Map()

  subscribe(event: EventTypes, book: Book, listener: EventListener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Map())
    }

    const bookListeners = this.listeners.get(event)!
    if (!bookListeners.has(book)) {
      bookListeners.set(book, [])
    }

    bookListeners.get(book)!.push(listener)
  }

  unsubscribe(event: EventTypes, book: Book, listener: EventListener) {
    const bookListeners = this.listeners.get(event)
    if (bookListeners) {
      const listeners = bookListeners.get(book)
      if (listeners) {
        const index = listeners.indexOf(listener)
        if (index > -1) {
          listeners.splice(index, 1)
        }
      }
    }
  }

  notify(event: EventTypes, book: Book) {
    const bookListeners = this.listeners.get(event)
    if (bookListeners) {
      const listeners = bookListeners.get(book)
      if (listeners) {
        listeners.forEach((listener) => listener.update(event, book))
      }
    }
  }
}
