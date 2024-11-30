import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import categoryManageRoutes from './src/routes/Admin/category-manage.routes.js';
import userManageRoutes from './src/routes/Admin/user-manage.routes';
import orderPageRoutes from './src/routes/Admin/order-page.routes';

// Janani's routes
import profilepageRouter from './src/routes/Customer/profile-page.routes';
import editProfileRouter from './src/routes/Customer/edit-profile.routes';
import purchaseHistoryRouter from './src/routes/Customer/purchasehistory.routes';
import wishlistRouter from './src/routes/Customer/wishlist.routes';
import errorHandler from './src/middlewares/errorHandler';

dotenv.config();

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

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
