import request from "supertest";
import {  APP, dataSource } from './index';

import { BookRoutes } from "./routes/books.route";
import { AuthorRoutes } from "./routes/authors.route";
 

beforeEach(async ()=> {
  await dataSource.initialize();
})

afterEach(async () => {
  await dataSource.destroy()
})
  

describe("Test app.ts", () => {

  // We add more ERROR / BookNotFound .. tests
  it('Testing -> /', async () => {
    const res = await request(APP).get("/");
    expect(res.statusCode).toEqual(200);
  });
  
  it('Testing -> /books/all ', async () => {
    const res = await request(APP).get("/books/all");
    expect(res.statusCode).toBe(200);
  });

  it('Testing -> /books/:idOrIsbn ', async () => {
    const res = await request(APP).get("/books/67980");
    expect(res.statusCode).toBe(200);
  });

});