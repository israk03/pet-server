import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from "./routes/index.js";
import { notFound } from "./errors/notFound.js";
import { globalErrorHandler } from "./errors/globalErrorHandler.js";


const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
 app.use('/api/v1', router);


              

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from PetMate World!');
});

app.use(globalErrorHandler)
app.use(notFound)

export default app;
