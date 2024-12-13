const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./src/routes/userRoutes');
const bookCardRoutes = require('./src/routes/Customer/bookCardRoutes');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,uploadType, folder, subfolder');
    next();
});

app.use('/user', userRoutes);
app.use('/book-card', bookCardRoutes);

app.listen(port, () => {
    console.log(`Server is running on port${port}`);
})