// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(cors());


// //dhanushka 
// const bookControllerRouter = require('./src/routes/book.routes');

// app.use('/Update-book-details', bookControllerRouter);
// app.use(bodyParser.json()); // Middleware to parse JSON bodies
// app.use(express.urlencoded({ extended: true }));
// app.use("/api/books", require("./src/routes/book.routes"));

// const port = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use(express.json());


// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,uploadType, folder, subfolder');
//     next();
// });

// app.listen(port, () => {
//     console.log(`Server is running on port${port}`);
// })

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Import Routes
const bookControllerRouter = require('./src/routes/book.routes');

// Routes
app.use('/Update-book-details', bookControllerRouter);
// app.use('/api/books', bookControllerRouter);

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
