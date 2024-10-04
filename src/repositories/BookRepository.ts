import Book, { IBook } from '../models/Book';

class BookRepository {
  async create(bookData: Partial<IBook>): Promise<IBook> {
    const book = new Book(bookData);
    return await book.save();
  }

  async findAll(): Promise<IBook[]> {
    return await Book.find().populate('author');
  }

  async findById(id: string): Promise<IBook | null> {
    return await Book.findById(id).populate('author');
  }

  async update(id: string, updateData: Partial<IBook>): Promise<IBook | null> {
    return await Book.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string): Promise<IBook | null> {
    return await Book.findByIdAndDelete(id);
  }

  async findByISBN(isbn: string): Promise<IBook | null> {
    return await Book.findOne({ isbn }).populate('author');
  }
}

export default new BookRepository();