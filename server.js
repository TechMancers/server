const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//janani
const profilepageRouter = require('./src/routes/Customer/profile-page.routes');
const editProfileRouter = require('./src/routes/Customer/edit-profile.routes');
const purchaseHistoryRouter = require('./src/routes/Customer/purchasehistory.routes');
const wishlistRouter = require('./src/routes/Customer/wishlist.routes');


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

//janani
app.use('/profile-page', profilepageRouter);
app.use('/edit-profile', editProfileRouter);
app.use('/purchasehistory', purchaseHistoryRouter);
app.use('/wishlist', wishlistRouter);






app.listen(port, () => {
    console.log(`Server is running on port${port}`);
})