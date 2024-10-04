import { Schema, model, Document } from 'mongoose';

export interface IAuthor extends Document {
  name: string;
  country: string;
  birthDate: Date;
}

const AuthorSchema = new Schema<IAuthor>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Author = model<IAuthor>('Author', AuthorSchema);

export default Author;