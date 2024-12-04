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

//janani
const profilepageRouter = require('./src/routes/Customer/profile-page.routes');
const editProfileRouter = require('./src/routes/Customer/edit-profile.routes');
const purchaseHistoryRouter = require('./src/routes/Customer/purchasehistory.routes');
const wishlistRouter = require('./src/routes/Customer/wishlist.routes');
const searchBookRouter = require('./src/routes/Customer/search-book.routes')

const errorHandler = require("./src/middlewares/errorHandler");

const {upload, deleteFromS3} = require('./src/middlewares/file-upload');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization,uploadType, folder, subfolder"
  );
  next();
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

//admin
app.use("/admin", adminRoutes);
app.use("/book-categories", categoryManageRoutes);
app.use("/manage-users", userManageRoutes);
//janani
app.use('/profile-page', profilepageRouter);
app.use('/edit-profile', editProfileRouter);
app.use('/purchasehistory', purchaseHistoryRouter);
app.use('/wishlist', wishlistRouter);
app.use('/search-book', searchBookRouter);

//kaumi
app.use('/cart', cartRoutes);
app.use('/purchase', purchaseRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
