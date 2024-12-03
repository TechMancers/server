const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(bodyParser.json());

// Import Routes
const bookControllerRouter = require('./src/routes/book.routes');
// const Category = require('./src/models/categories/menage-categories');

// Routes
app.use('/Update-book-details', bookControllerRouter);
// app.use('/category-details',Category);


// CORS Headers for Access Control
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, uploadType, folder, subfolder');
    next();
});

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
