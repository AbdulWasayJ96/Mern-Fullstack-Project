// 1. Load environment variables first
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

// 2. Debugging: Check if MONGO_URI is reaching the container
console.log("DEBUG: Current MONGO_URI starts with:", process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 20) : "UNDEFINED");

const app = express();

// 3. Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// 4. Routes
app.use('/api/workouts', workoutRoutes);

// 5. Database Connection Logic
const dbURI = process.env.MONGO_URI;

if (!dbURI) {
  console.error("CRITICAL ERROR: MONGO_URI is not defined in the environment variables.");
  process.exit(1); // Stop the container so you know there is a configuration error
}

mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to database successfully');
    
    // Use the PORT variable from ECS, fallback to 5000
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log('Listening for requests on port', port);
    });
  })
  .catch((err) => {
    console.error("FAILED to connect to MongoDB Atlas:");
    console.error(err.message);
    // Exit so ECS knows the task failed and can try to restart it
    process.exit(1);
  });
