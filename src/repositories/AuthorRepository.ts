import { FilterQuery } from 'mongoose';
import Author, { IAuthor } from '../models/Author';

class AuthorRepository {
    async findByName(name: string): Promise<IAuthor | null> {
      const author = await Author.findOne({ name });
      return author;
    }
  
    async create(authorData: Partial<IAuthor>): Promise<IAuthor> {
      const newAuthor = await Author.create(authorData);
      return newAuthor;
    }

    // to find by directly passing the author data from the request body
    async findByData(authorData: Partial<IAuthor>): Promise<IAuthor | null> {
        const author = await Author.findOne(authorData as FilterQuery<IAuthor>);
        return author;
      }
  }

export default new AuthorRepository();