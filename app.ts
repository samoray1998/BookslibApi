import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { Book } from './model/book.model';
import { BookRoutes } from './routes/books.route';
import { Author } from './model/author.model';
import { AuthorRoutes } from './routes/authors.route';


// Usually we use this to avoid CORS problem.
var cors = require('cors');

// Our App exported to be used in testing with JEST
export const APP = express();

// Golobal middlewares
APP.use(express.json());
APP.use(cors());


// Setup Our Database Connection.
export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as any,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    entities: [
        Author,
        Book
    ], 
});


// Routes Middlewares
APP.use('/books', new BookRoutes(dataSource).router);
APP.use("/author",new AuthorRoutes(dataSource).router);
APP.get('/' , (req, res) => {
    return res.send("<h1>Hello world!</h1>");
});
