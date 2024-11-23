const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const cartRoutes = require('./src/routes/cart.routes');
const purchaseRoutes = require('./src/routes/purchase.routes');


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
  app.use('/cart', cartRoutes);
  app.use('/purchase', purchaseRoutes);

app.listen(port, () => {
    console.log(`Server is running on port${port}`);
})