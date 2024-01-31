import { DataSource, Repository } from 'typeorm';
import { Book } from '../model/book.model';
import dotenv from 'dotenv';
dotenv.config();

export class BookService {
    private dataSource: DataSource;
    constructor(dataSource: DataSource){
        this.dataSource = dataSource;
    }
   

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

    
      // Edit by ID
      bookToUpdate = await this.dataSource.getRepository(Book).findOne({where:{id:parseInt(idOrIsbn.toString()) }});
    /// Check if bookToUpdate is empty 
    if(!bookToUpdate){

      // Edit by ISBN
      bookToUpdate = await this.dataSource.getRepository(Book).findOne({ where: { isbn: idOrIsbn.toString() } });
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

   
      // Edit by ID
      book = await this.dataSource.getRepository(Book).findOne({where:{id:parseInt(idOrIsbn.toString()) }});
   if (!book) {
     // Edit by ISBN
     book = await this.dataSource.getRepository(Book).findOne({ where: { isbn: idOrIsbn.toString() } });
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
