import BookRepository from '../repositories/BookRepository';
import AuthorRepository from '../repositories/AuthorRepository';
import { IBook } from '../models/Book';
import { IAuthor } from '../models/Author';
import { ObjectId } from 'mongodb';

class BookService {
  async createBook(bookData: Partial<IBook>): Promise<{ book?: IBook; error?: string }> {
    const requiredFields = ['title', 'author', 'price', 'isbn', 'language', 'numberOfPages', 'publisher'];
    // normally, we should use use a validation library like Joi to validate the data
    for (const field of requiredFields) { 
      if (!bookData[field as keyof IBook]) {
        return { error: `Field '${field}' is required.` };
      }
    }
  
    // check if the author is an object
    let authorId: ObjectId;
    if (typeof bookData.author === 'object') {
      // check if the author already exists
      const author = await this.checkAuthor(bookData.author as Partial<IAuthor>);
      if (!author) {
        return { error: 'Failed to create author.' };
      }
      authorId = author._id as ObjectId;
    } else {
      return { error: 'Invalid author data.' };
    }
  
    bookData.author = authorId;
    const newBook = await BookRepository.create(bookData);
    return { book: newBook };
  }
  
  // check if the author already exists
  private async checkAuthor(authorData: Partial<IAuthor>): Promise<IAuthor | null> {
    const existingAuthor = await AuthorRepository.findByData(authorData);
    if (existingAuthor) {
      return existingAuthor;
    }
    const newAuthor = await AuthorRepository.create(authorData);
    return newAuthor;
  }

  // get all books
  async getAllBooks(): Promise<{ books?: IBook[]; error?: string }> {
    try {
      const books = await BookRepository.findAll();
      return { books };
    } catch (error) {
      return { error: 'Failed to retrieve books.' };
    }
  }

  // get a book by ID
  async getBookById(id: string): Promise<{ book?: IBook; error?: string }> {
    const book = await BookRepository.findById(id);
    if (!book) {
      return { error: 'Book not found.' };
    }
    return { book };
  }

  // update a book
  async updateBook(id: string, updateData: Partial<IBook>): Promise<{ updatedBook?: IBook; error?: string }> {
    if (updateData.isbn) {
      // check if book with the ISBN already exists
      const existingBook = await BookRepository.findByISBN(updateData.isbn as string);
      if (existingBook) {
        return { error: 'Another book with this ISBN already exists.' };
      }
    }

    const updatedBook = await BookRepository.update(id, updateData);
    if (!updatedBook) {
      return { error: 'Book not found.' };
    }
    return { updatedBook };
  }


  // delete book by ID
  async deleteBook(id: string): Promise<{ error?: string }> {
    const deletedBook = await BookRepository.delete(id);
    if (!deletedBook) {
      return { error: 'Book not found.' };
    }
    return {};
  }
}

export default new BookService();