import express from 'express';
import { sequelize } from './models/db.js'; // Assuming .ts extension
import routes from './routes/index.js'; // Assuming .ts extension
import userRoutes from './routes/auth-routes.js'; // Assuming .ts extension
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();

// Middleware for static files (serving the client-side build)
app.use(express.static('../client/dist'));

// Middleware for JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the API routes for user authentication
app.use('/api/auth', userRoutes);

app.use('/api/user', userRoutes);

// Catch-all route for frontend (if you’re using a client-side framework like React)
app.use(routes);

const PORT = process.env.PORT || 3001;


// Database connection and server start
sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
    return sequelize.sync(); // Sync all models
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Global error handler (optional)
app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {

  console.error('An error occurred:', err);

  console.log('res is not a proper response object', res);

  if(res && typeof res.status === 'function') {

    res.status(500).json({ error: 'Something went wrong!' });
  } else {
    next(err);
  }
});
