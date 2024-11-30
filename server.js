import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

import categoryManageRoutes from './src/routes/Admin/category-manage.routes';
import userManageRoutes from './src/routes/Admin/user-manage.routes';
import orderPageRoutes from './src/routes/Admin/order-page.routes';

const categoryManageRoutes = require('./src/routes/Admin/category-manage.routes');
const userManageRoutes = require('./src/routes/Admin/user-manage.routes');

//janani
const profilepageRouter = require('./src/routes/Customer/profile-page.routes');
const editProfileRouter = require('./src/routes/Customer/edit-profile.routes');
const purchaseHistoryRouter = require('./src/routes/Customer/purchasehistory.routes');
const wishlistRouter = require('./src/routes/Customer/wishlist.routes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,uploadType, folder, subfolder');
    next();
});

//janani
app.use('/profile-page', profilepageRouter);
app.use('/edit-profile', editProfileRouter);
app.use('/purchasehistory', purchaseHistoryRouter);
app.use('/wishlist', wishlistRouter);






app.use('/book-categories', categoryManageRoutes);
app.use('/manage-users', userManageRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})