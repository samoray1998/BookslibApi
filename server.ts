import { APP, dataSource } from "./app";


APP.listen(process.env.SERVER_PORT as any|| 1338, process.env.SERVER as any, () =>
{
    console.log(`listning to port ${process.env.PORT||1337}`)
});



(async () => {
    try {
      await dataSource.initialize();
      console.log("the database connected")
    } catch (error) {
      console.error(error);
    }
  })()
