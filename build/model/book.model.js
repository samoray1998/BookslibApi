"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
// NOTE: here we're using lowercase for naming convention, 
// the idea here is that we name the files with x.model.ts 
// which makes searching for the file easier, and straight forward,
// because at the end we could have route called user and model called user, which is a bit confusing.
// with this way we're sure that we are in the right file since it ends up with x.model.ts
const typeorm_1 = require("typeorm");
const author_model_1 = require("./author.model");
// title, author, ISBN, and publication year.
let Book = class Book {
};
exports.Book = Book;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Book.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Book.prototype, "isbn", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => author_model_1.Author, author => author.books),
    __metadata("design:type", author_model_1.Author)
], Book.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Book.prototype, "publish_year", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Book.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Book.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Book.prototype, "created_at", void 0);
exports.Book = Book = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['isbn'])
], Book);
