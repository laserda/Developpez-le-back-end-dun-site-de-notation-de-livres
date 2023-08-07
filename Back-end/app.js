const express = require("express");
const path = require('path');
const dbContext = require("./data/dbContext");

const bookRouter = require("./routes/BookRouter");
const userRouter = require("./routes/UserRouter");


const app = express();
dbContext();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/books", bookRouter);
app.use("/api/auth", userRouter);

module.exports = app;