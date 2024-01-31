import { APP, dataSource } from "./app";


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
