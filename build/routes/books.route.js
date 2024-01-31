"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = require("express");
const book_service_1 = require("../services/book.service");
const book_model_1 = require("../model/book.model");
const express_validator_1 = require("express-validator");
const author_service_1 = require("../services/author.service");
class BookRoutes {
    constructor(dataSource) {
        this.router = (0, express_1.Router)();
        this.dataSource = dataSource;
        this.bookService = new book_service_1.BookService(dataSource);
        this._init();
    }
    _init() {
        this.router.get('/all', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                var xBooks = yield this.bookService.getAllBooks();
                return res.status(200).send({ "books": xBooks });
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        }));
        this.router.get('/:idOrIsbn', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idOrIsbn } = req.params;
            try {
                const book = yield this.bookService.getBookbyIdOrIsbn(idOrIsbn);
                if (book) {
                    return res.status(200).json(book);
                }
                else {
                    return res.status(404).send('Book not found');
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }
        }));
        this.router.post('/', (0, express_validator_1.body)("authorId").isNumeric(), (0, express_validator_1.body)("isbn").isString(), (0, express_validator_1.body)("title").isString(), (0, express_validator_1.body)("publish_year").isDate(), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { authorId, isbn, title, publish_year } = req.body;
            /// check if the author is in database 
            const authorService = new author_service_1.AuthorService(this.dataSource);
            const author = yield authorService.getAuthorById(authorId);
            if (!author)
                return res.status(500).json({ "error": "Author not found" });
            const book = new book_model_1.Book();
            book.author = author;
            book.isbn = isbn;
            book.title = title;
            book.publish_year = publish_year;
            var xBook = yield this.bookService.insertBook(book);
            return res.status(200).json({ "data": xBook });
        }));
        this.router.put('/:idOrIsbn', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idOrIsbn } = req.params;
            const updatedBookData = req.body;
            try {
                const updatedBook = yield this.bookService.editBook(idOrIsbn, updatedBookData);
                if (updatedBook) {
                    return res.status(200).json(updatedBook);
                }
                else {
                    return res.status(404).send('Book not found');
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }
        }));
        this.router.delete('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.bookService.deleteBookById(parseInt(id));
            }
            catch (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }
        }));
    }
}
exports.BookRoutes = BookRoutes;
