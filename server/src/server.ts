// @ts-nocheck
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import apiRoutes from './routes/api/index.js';
import { clerkMiddleware } from '@clerk/express';
import webhookRoutes from './routes/webhooks/index.js'

dotenv.config();

connectDB();

const app = express();

// Swagger options
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',   
        description: 'A simple Express API',
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 5000}`,
        },
      ],
    },
    apis: ['./routes/api/*.ts', './dist/routes/api/*.js'], // Path to the API docs
  };
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(clerkMiddleware())

app.use(express.json());

// Configure CORS with specific options
app.use(cors({
  origin: 'https://localhost:3000', // Replace with your client's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Api Routes
app.use('/api', apiRoutes);
// Webhook Routes
app.use('/api/webhooks', webhookRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});