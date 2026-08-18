const express = require('express');
const app = express();
const productRoute = require('.Routes/ProductRoute'); 

app.use('/products', productRoute); // Use the product route

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});