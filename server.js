const express = require('express');
const bodyParser = require('body-parser');

const profilepageRouter = require('./src/routes/Customer/profile-page.routes.js');
const editProfileRouter = require('./src/routes/Customer/edit-profile.routes.js');
const wishlistRouter = require('./src/routes/Customer/wishlist.routes.js');
const searchBookRouter = require('./src/routes/Customer/search-book.routes.js');
const orderManageRoutes = require('./src/routes/Admin/order-manage.routes');

const errorHandler = require('./src/middlewares/errorHandler.js');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set headers for CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, uploadType, folder, subfolder'
    );
    next();
});

// User routes
app.use('/profile-page', profilepageRouter);
app.use('/edit-profile', editProfileRouter);
app.use('/wishlist', wishlistRouter);
app.use('/search-book', searchBookRouter);
app.use('/manage-orders', orderManageRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
