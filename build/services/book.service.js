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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_model_1 = require("../model/book.model");
const dotenv_1 = __importDefault(require("dotenv"));
// import { dataSource } from '../index';
dotenv_1.default.config();
class BookService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    /// add a new book
    insertBook(bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = this.dataSource.getRepository(book_model_1.Book).create(bookData);
            return yield this.dataSource.getRepository(book_model_1.Book).save(book);
        });
    }
    /// get all books
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataSource.getRepository(book_model_1.Book).find();
        });
    }
    editBook(idOrIsbn, updatedBook) {
        return __awaiter(this, void 0, void 0, function* () {
            let bookToUpdate;
            if (typeof idOrIsbn === 'number') {
                // Edit by ID
                bookToUpdate = yield this.dataSource.getRepository(book_model_1.Book).findOne({ where: { id: idOrIsbn } });
            }
            else {
                // Edit by ISBN
                bookToUpdate = yield this.dataSource.getRepository(book_model_1.Book).findOne({ where: { isbn: idOrIsbn } });
            }
            if (!bookToUpdate) {
                return null; // Book not found
            }
            Object.assign(bookToUpdate, updatedBook);
            yield this.dataSource.getRepository(book_model_1.Book).save(bookToUpdate);
            return bookToUpdate;
        });
    }
    getBookbyIdOrIsbn(idOrIsbn) {
        return __awaiter(this, void 0, void 0, function* () {
            let book;
            if (typeof idOrIsbn === 'number') {
                // Edit by ID
                book = yield this.dataSource.getRepository(book_model_1.Book).findOne({ where: { id: idOrIsbn } });
            }
            else {
                // Edit by ISBN
                book = yield this.dataSource.getRepository(book_model_1.Book).findOne({ where: { isbn: idOrIsbn } });
            }
            if (!book) {
                return null; // Book not found
            }
            return book;
        });
    }
    deleteBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.dataSource.getRepository(book_model_1.Book).delete(id);
            }
            catch (error) {
                console.error('Error deleting book by ID:', error);
                throw error;
            }
        });
    }
}
exports.BookService = BookService;
