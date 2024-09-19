import express from "express"; 
// import  pino  from "pino-http";
import cors from "cors";
// import studentsRouter from "./routers/students.js";
import router from "./routers/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import logger from "./middlewares/logger.js";

import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
    const app = express();

        app.use(logger); 
        app.use(cors());
        app.use(
            express.json({
                type:['application/json', 'application/vnd.api+json'],
                limit: '100kb'
            }));
        app.get("/", (reg, res)=>{
            res.json({
                message: 'Hello world!',
            }); 
        });

        app.use(router);
       
        app.use('*', notFoundHandler);
        app.use(errorHandler);
        
        app.listen(PORT, ()=> {
            console.log(`Server is running on port ${PORT}`);
        });
 
    };