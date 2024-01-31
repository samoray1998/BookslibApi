import { APP, dataSource } from "./index";
import { AuthorRoutes } from "./routes/authors.route";
import { BookRoutes } from "./routes/books.route";


APP.listen(process.env.PORT || 1338, () =>
{
    console.log(`listning to port ${process.env.PORT||1337}`)
});



(async () => {
    try {
      await dataSource.initialize();
    } catch (error) {
      console.error(error);
    }
  })()
