const express = require("express");
const productRouter=require('./routes/ProductRoutes')
const connectdb = require("./config/connectDB");
const Product = require("./models/Product");

require("dotenv").config();

const app = express();


app.use(express.json())

//console.log(process.env.MONGO_URI);
connectdb()

app.use('/products', productRouter)

const port = 5000;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
