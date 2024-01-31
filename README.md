# BookslibApi

#### Brief about this project.

This is the result of the test that given to me, and basically it's not fully coverd but it had all the necessary stuff, i'm using `node env` with `ExpressJS`, and for the database I'm using `postgres`, connecting to it using `TypeORM`, i'm using `ExpressValidator` as middleware for data checking and for API testing i'm using `supertest`.


> Requirements

- Postgres
- NodeJS >= v21.6.1


> How to Run

1. cd BookslibApi/
2. configure .env.example and then rename it to .env
3. run npm i
4. npm run start.

> How to run tests

1. cd BookslibApi/
2. npm run test


#### NOTES:

- For testing i didn't put much it, but it was just to show it and it has only checks on response status.
- There is no Authentication, althought i was planning on using a JWT AuthMiddleware.
- The main file that launches the server is server.ts while app.ts is just a setup for our Express APP (Necessary for testing).