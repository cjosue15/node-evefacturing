import { envs } from "./config/envs";
import { MongoDatabase } from "./data";
import { Server } from "./presentation/server";
import appRoutes from "./routes/routes";

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const server = new Server({
    port: envs.PORT,
    routes: appRoutes,
    origin: envs.FRONT_URL,
  });

  server.start();
}
