import { initMangoDB } from "./db/initMongoDB.js";
import { startServer } from "./server.js";

const bootstrap = async () => {
    await initMangoDB();
    startServer();
};

bootstrap();