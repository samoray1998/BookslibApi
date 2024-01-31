"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.APP = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const book_model_1 = require("./model/book.model");
const books_route_1 = require("./routes/books.route");
const author_model_1 = require("./model/author.model");
const authors_route_1 = require("./routes/authors.route");
dotenv_1.default.config();
var cors = require('cors');
//app intialization
exports.APP = (0, express_1.default)();
//Golobal middlewares
exports.APP.use(express_1.default.json());
exports.APP.use(cors());
// Setup DB CONNECTION
// //process.env.DB_NAME
exports.dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "mamaneTech",
    logging: true,
    synchronize: true,
    entities: [author_model_1.Author, book_model_1.Book],
});
exports.APP.use('/books', new books_route_1.BookRoutes(exports.dataSource).router);
exports.APP.use("/author", new authors_route_1.AuthorRoutes(exports.dataSource).router);
exports.APP.get('/', (req, res) => {
    return res.send("<h1>Hello world!</h1>");
});
