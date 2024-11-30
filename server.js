import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

const categoryManageRoutes = require('./src/routes/Admin/category-manage.routes');
const userManageRoutes = require('./src/routes/Admin/user-manage.routes');
const orderManageRoutes = require('./src/routes/Admin/order-manage.routes');

const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, uploadType, folder, subfolder');
    next();
});

// Janani's routes
app.use('/profile-page', profilepageRouter);
app.use('/edit-profile', editProfileRouter);
app.use('/purchasehistory', purchaseHistoryRouter);
app.use('/wishlist', wishlistRouter);

// Admin routes
app.use('/book-categories', categoryManageRoutes);
app.use('/manage-users', userManageRoutes);
app.use('/manage-orders', orderManageRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
