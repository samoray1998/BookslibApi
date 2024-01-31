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
exports.AuthorService = void 0;
const author_model_1 = require("../model/author.model");
class AuthorService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    addAuthor(xauthor) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataSource.getRepository(author_model_1.Author).save(xauthor);
        });
    }
    getAuthorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let author;
            author = yield this.dataSource.getRepository(author_model_1.Author).findOne({ where: { id: id } });
            if (!author) {
                return null;
            }
            return author;
        });
    }
}
exports.AuthorService = AuthorService;
