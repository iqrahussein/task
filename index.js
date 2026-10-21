import dotenv from "dotenv";
dotenv.config();
// const express = require("express");
import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import helmet from 'helmet';
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger.js';
import { limiter } from './middlewares/rateLimiter.js';


// const mongoose = require("mongoose");
import bookRouter from "./router/book.js";
import authRouter from "./router/auth.js"
import adminRouter from "./router/admin.js"
import uploadRoutes from "./router/upload.js"
import taskRoutes from "./router/tasks.js"

import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/notFound.js";
// import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors({
  origin:['http://localhost:3000/books']
}))
app.use(limiter)

const PORT = process.env.port || 3000;

app.use(express.json());


app.use("/book", bookRouter);
app.use("/auth",authRouter)
app.use("/admin",adminRouter)
app.use("/upload",uploadRoutes)
app.use("/tasks",taskRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// app.use(logger);
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV='devlopment'){
  app.use(morgan('dev'))
}


app.get("/books", (req, res) => {
  res.send("hello iqra hussein");
});

app.use(notFound);

// app.use(errorHandler);
mongoose
  .connect(process.env.NODE_ENV =="devlopment"? process.env.MONGO_URI_DEV:MONGO_URI_PRO)
  .then(() => console.log("✅ MongoDB connected locally"))
  .catch((err) => console.log("❌ Connection error:", err));

app.listen(5000, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
