import { DataSource, Repository } from 'typeorm';
import { Book } from '../model/book.model';
import dotenv from 'dotenv';
// import { dataSource } from '../index';
dotenv.config();

export class BookService {
    // private dataSource:DataSource;
    // private bookRepository: Repository<Book>
    // constructor(
    //     ds:DataSource){
    // this.dataSource=ds;
    // this.
    // }
    private dataSource: DataSource;

    constructor(dataSource: DataSource){
        this.dataSource = dataSource;
    }
   
  /// add a new book

  async insertBook(bookData: Partial<Book>): Promise<Book> {
    const book = this.dataSource.getRepository(Book).create(bookData);
    return await this.dataSource.getRepository(Book).save(book);
  }

  /// get all books

  async getAllBooks(): Promise<Book[]> {
    return this.dataSource.getRepository(Book).find();
  }

  async editBook(idOrIsbn: string | number, updatedBook: Partial<Book>): Promise<Book | null> {
    let bookToUpdate: Book | null 

    if (typeof idOrIsbn === 'number') {
      // Edit by ID
      bookToUpdate = await this.dataSource.getRepository(Book).findOne({where:{id:idOrIsbn}});
    } else {
      // Edit by ISBN
      bookToUpdate = await this.dataSource.getRepository(Book).findOne({ where: { isbn: idOrIsbn } });
    }

    if (!bookToUpdate) {
      return null; // Book not found
    }   
    Object.assign(bookToUpdate, updatedBook);
    await this.dataSource.getRepository(Book).save(bookToUpdate);

    return bookToUpdate;
  }

  async getBookbyIdOrIsbn(idOrIsbn: string | number): Promise<Book | null> {
    let book: Book | null 

    if (typeof idOrIsbn === 'number') {
      // Edit by ID
      book = await this.dataSource.getRepository(Book).findOne({where:{id:idOrIsbn}});
    } else {
      // Edit by ISBN
      book = await this.dataSource.getRepository(Book).findOne({ where: { isbn: idOrIsbn } });
    }

    if (!book) {
      return null; // Book not found
    }   
    

    return book;
  }

  async deleteBookById(id: number): Promise<void> {
    try {
      await this.dataSource.getRepository(Book).delete(id);

    } catch (error) {
      console.error('Error deleting book by ID:', error);
      throw error;
    }
  }
}
