import { Request, Response, NextFunction } from 'express';
import BookService from '../services/BookService';
import { IBook } from '../models/Book';

class BookController {
  async createBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookData: Partial<IBook> = req.body;
      const newBook = await BookService.createBook(bookData);
      res.status(201).json(newBook);
    } catch (error) {
      next(error);
    }
  }

  async getAllBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const books = await BookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  async updateBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookId = req.params.id;
      const updateData: Partial<IBook> = req.body;
      const updatedBook = await BookService.updateBook(bookId, updateData);
      if (!updatedBook) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }
      res.status(200).json(updatedBook);
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookId = req.params.id;
      const deletedBook = await BookService.deleteBook(bookId);
      if (!deletedBook) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();