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
exports.AuthorRoutes = void 0;
const express_1 = require("express");
const author_service_1 = require("../services/author.service");
const express_validator_1 = require("express-validator");
const author_model_1 = require("../model/author.model");
class AuthorRoutes {
    constructor(dataSource) {
        this.router = (0, express_1.Router)();
        this.authorService = new author_service_1.AuthorService(dataSource);
        this._init();
    }
    _init() {
        this.router.post("/addAuthor", (0, express_validator_1.body)('fname').isString(), (0, express_validator_1.body)("lname").isString(), (0, express_validator_1.body)("birthDate").isDate(), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { fname, lname, birthDate } = req.body;
            if (!fname || !lname || !birthDate) {
                return res.status(500).send({
                    "error": "something went wrong"
                });
            }
            const author = new author_model_1.Author();
            author.firstName = fname;
            author.lastName = lname;
            author.bithDate = birthDate;
            const savedAuthor = yield this.authorService.addAuthor(author);
            return res.status(200).send({ "status": "ok", "data": savedAuthor });
        }));
    }
}
exports.AuthorRoutes = AuthorRoutes;
