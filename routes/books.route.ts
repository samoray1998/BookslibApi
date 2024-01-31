import { Router } from "express";
import { BookService } from "../services/book.service";
import { Book } from "../model/book.model";
import { DataSource } from "typeorm";
import { body } from "express-validator";
import { AuthorService } from "../services/author.service";

export class BookRoutes {

  public router = Router();
  private bookService : BookService;
  private dataSource: DataSource;

  constructor(dataSource: DataSource)
  {
    this.dataSource = dataSource;
    this.bookService = new BookService(dataSource);
    this._init();
  }

  private _init()
  {

    this.router.get('/all' , async (req, res) => {
      try {

        var xBooks=await this.bookService.getAllBooks()
        return res.status(200).send({"books":xBooks})

      } catch (error) {
              console.error(error);
          res.status(500).send('Internal Server Error');
      }
  })

  this.router.get('/:idOrIsbn' ,async (req, res) => {
    const { idOrIsbn } = req.params;
    try {
        const book = await this.bookService.getBookbyIdOrIsbn(idOrIsbn);
    
        if (book) {
          return res.status(200).json(book);
        } else {
          return res.status(404).send('Book not found');
        }
      } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
      }
});

this.router.post('/' ,body("authorId").isNumeric(),body("isbn").isString(),body("title").isString(),body("publish_year").isDate(), async (req, res)   =>  {

  const {authorId,isbn,title,publish_year}=req.body;
  /// check if the author is in database 
  const authorService = new AuthorService(this.dataSource);

  const author=await authorService.getAuthorById(authorId)

  if(!author) return res.status(500).json({"error":"Author not found"})
  
  const book = new Book();
  book.author = author ;
  book.isbn = isbn;
  book.title=title
  book.publish_year= publish_year
  
  var xBook = await this.bookService.insertBook(book)
  return res.status(200).json({"data":xBook});
});



this.router.put('/:idOrIsbn', async (req, res) => {
  const { idOrIsbn } = req.params;
  const updatedBookData = req.body;

  try {
      const updatedBook = await this.bookService.editBook(idOrIsbn, updatedBookData);
  
      if (updatedBook) {
        return res.status(200).json(updatedBook);
      } else {
        return res.status(404).send('Book not found');
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
});


this.router.delete('/:id' ,async (req, res) => {
  const { id } = req.params;
  
  try {
    await this.bookService.deleteBookById(parseInt(id))
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }

})}
    
}

