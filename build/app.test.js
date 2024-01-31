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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("./index");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.dataSource.initialize();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.dataSource.destroy();
}));
// it('/books test .. 2', async () => {
//   const res = await request(APP).get("/books/all");
//   expect(res.statusCode).toBe(200);
// });
describe("Test app.ts", () => {
    it('Testing -> /', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.APP).get("/");
        expect(res.statusCode).toEqual(200);
    }));
    it('Testing -> /books/all ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.APP).get("/books/all");
        expect(res.statusCode).toBe(200);
    }));
    it('Testing -> /books/:idOrIsbn ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.APP).get("/books/67980");
        expect(res.statusCode).toBe(200);
    }));
});
