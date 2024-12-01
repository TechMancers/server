import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import categoryManageRoutes from './src/routes/Admin/category-manage.routes.js';
import userManageRoutes from './src/routes/Admin/user-manage.routes.js';
import orderManageRoutes from './src/routes/Admin/order-manage.routes.js';
import profilepageRouter from './src/routes/Customer/profile-page.routes.js';
import editProfileRouter from './src/routes/Customer/edit-profile.routes.js';
import wishlistRouter from './src/routes/Customer/wishlist.routes.js';

// Import middleware
import errorHandler from './src/middlewares/errorHandler.js';

// Initialize dotenv
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use('/purchasehistory', purchaseHistoryRouter);
app.use('/wishlist', wishlistRouter);

// Admin routes
app.use('/book-categories', categoryManageRoutes);
app.use('/manage-users', userManageRoutes);
app.use('/manage-orders', orderManageRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
