require('dotenv').config();
const express = require('express');
const connectDB = require("./config/db");
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

//db
connectDB();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

//middleware
app.use(morgan('dev'));
//app.use(cors());
app.use(cors());


//routes
app.use('/api/card', require('./routes/card.route'))
app.use('/api/product', require('./routes/product.route'))


const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`)
})