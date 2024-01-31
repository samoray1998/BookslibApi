import express from 'express';
import dotenv from 'dotenv';
import { DataSource, EntityManager } from 'typeorm';
import { Book } from './model/book.model';
import { BookService } from './services/book.service';
import { stringify } from 'querystring';
import { BookRoutes } from './routes/books.route';
import { Author } from './model/author.model';
import { AuthorRoutes } from './routes/authors.route';
dotenv.config();


var cors = require('cors');

//app intialization

export const APP = express();

//Golobal middlewares
APP.use(express.json());
APP.use(cors());


// Setup DB CONNECTION
// //process.env.DB_NAME
export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database:"mamaneTech" ,
   
    logging: true,
    synchronize: true,
    entities: [Author,Book], 
});


APP.use('/books', new BookRoutes(dataSource).router);
APP.use("/author",new AuthorRoutes(dataSource).router);

APP.get('/' , (req, res) => {
    return res.send("<h1>Hello world!</h1>");
});
