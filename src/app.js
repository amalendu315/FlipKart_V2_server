//Importing modules
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require("./routes");

//ENV Config or Constants
dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Routes
app.use('/api',routes);

//mongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((con)=>{
    console.log(`MoongoDB connected on ${con.connection.host}`);
}).catch((err)=>{
    console.log(err);
})

//Server running
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});