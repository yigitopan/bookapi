import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Book from '../models/Book';
import Author from '../models/Author';

beforeAll(async () => {
  const url = `mongodb://127.0.0.1:27017/bookapi_test`;
  await mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
});

afterAll(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
  await mongoose.connection.close();
});

describe('Book API', () => {
  it('should create a new book', async () => {
    const response = await request(app).post('/api/books').send({
      title: 'Test Book',
      author: {
        name: 'Test Author',
        country: 'Test Country',
        birthDate: '1990-01-01',
      },
      price: 10.99,
      isbn: '1234567890',
      language: 'English',
      numberOfPages: 200,
      publisher: 'Test Publisher',
    });
    expect(response.status).toBe(201);
    expect(response.body.book).toHaveProperty('title', 'Test Book');
  });

  const books: any[] = [];
  it('should get all books', async () => {
    const response = await request(app).get('/api/books');
    books.push(...response.body.books);
    expect(response.status).toBe(200);
    expect(response.body.books).toBeInstanceOf(Array);
  });

  it('should update a book', async () => {
    const book = books[0];
    if (!book) {
      throw new Error('Book not found');
    }
    const response = await request(app).put(`/api/books/${book._id}`).send({
      title: 'Updated Test Book',
    });
    expect(response.status).toBe(200);
    expect(response.body.updatedBook).toHaveProperty('title', 'Updated Test Book');
  });

  it('should delete a book', async () => {
    const book = books[0];
    if (!book) {
      throw new Error('Book not found');
    }
    const response = await request(app).delete(`/api/books/${book._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Book deleted successfully');
  });

  it('should return 404 for non-existent book', async () => {
    const response = await request(app).get('/api/books/1234567890');
    expect(response.status).toBe(404);
  });

  it('should return error for invalid book data', async () => {
    const response = await request(app).post('/api/books').send({
      title: '',
    });

    expect(response.body.error).toContain('required');
  });

  it('should return error for missing author data', async () => {
    const response = await request(app).post('/api/books').send({
      title: 'Test Book',
      author: "name",
      price: 10.99,
      isbn: '1234567890',
      language: 'English',
      numberOfPages: 200,
      publisher: 'Test Publisher',
    });

    expect(response.body.error).toContain('Invalid author');

  });
});