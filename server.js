import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

import categoryManageRoutes from './src/routes/Admin/category-manage.routes';
import userManageRoutes from './src/routes/Admin/user-manage.routes';
import orderPageRoutes from './src/routes/Admin/order-page.routes';

import errorHandler from './src/middlewares/errorHandler';

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,uploadType, folder, subfolder');
    next();
});

app.use('/book-categories', categoryManageRoutes);
app.use('/manage-users', userManageRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})