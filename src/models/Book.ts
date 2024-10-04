import { Schema, model, Document, Types } from 'mongoose';
import { IAuthor } from './Author';

export interface IBook extends Document {
  title: string;
  author: Types.ObjectId | IAuthor;
  price: number;
  isbn: string;
  language: string;
  numberOfPages: number;
  publisher: string;
}

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfPages: {
      type: Number,
      required: true,
      min: 1,
    },
    publisher: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = model<IBook>('Book', BookSchema);

export default Book;