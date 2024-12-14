const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//kaumi
const cartRoutes = require('./src/routes/Customer/cart.routes');
const purchaseRoutes = require('./src/routes/Customer/purchase.routes');

//buddhi
const categoryManageRoutes = require("./src/routes/Admin/category-manage.routes");
const userManageRoutes = require("./src/routes/Admin/user-manage.routes");
const adminRoutes = require("./src/routes/Admin/admin.routes");

const bookPreviewRoutes = require('./src/routes/Customer/book-preview.routes');

//janani
const profilepageRouter = require('./src/routes/Customer/profile-page.routes.js');
const editProfileRouter = require('./src/routes/Customer/edit-profile.routes.js');
const wishlistRouter = require('./src/routes/Customer/wishlist.routes.js');
const searchBookRouter = require('./src/routes/Customer/search-book.routes.js');
const orderManageRoutes = require('./src/routes/Admin/order-manage.routes');

//gihan
const userRoutes = require('./src/routes/userRoutes');
const bookCardRoutes = require('./src/routes/Customer/bookCardRoutes');
const categoriesRouter = require('./src/routes/Customer/category.routes');

const errorHandler = require("./src/middlewares/errorHandler");

const {upload, deleteFromS3} = require('./src/middlewares/file-upload');
// dhanushka admin 
const bookControllerRouter = require('./src/routes/Admin/book.routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set headers for CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, uploadType, folder, subfolder'
    );
    next();
});

// Define a route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the application!!');
});



app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log("req.file", req.file);
    console.log("req.headers", req.headers);
    res.json({ image: req.file });
  });
});

app.delete("/delete/:key", (req, res) => {
  const key = req.params.key;
  console.log("key", key);

  deleteFromS3(key, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to delete object from S3" });
    } else {
      res.status(200).json({ message: "Object deleted successfully" });
    }
  });
});

app.use(errorHandler);

//buddhi
app.use("/admin", adminRoutes);
app.use("/book-categories", categoryManageRoutes);
app.use("/manage-users", userManageRoutes);
//admin dhanushka
// const bookControllerRouter = require('./src/routes/Admin/book');
app.use('/Update-book-details', bookControllerRouter);


app.use("/book-preview", bookPreviewRoutes);
//janani
app.use('/profile-page', profilepageRouter);
app.use('/edit-profile', editProfileRouter);
app.use('/wishlist', wishlistRouter);
app.use('/search-book', searchBookRouter);
app.use('/manage-orders', orderManageRoutes);
//kaumi
app.use('/cart', cartRoutes);
app.use('/purchase', purchaseRoutes);
//gihan
app.use('/user', userRoutes);
app.use('/book-card', bookCardRoutes);
app.use('/categories', categoriesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
