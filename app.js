const express = require('express');
const userRouter = require('./routes/users');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
}));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(userRouter);

mongoose.connect("mongodb://localhost:27017/testNode", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(result => {
        console.log("Connected");
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });


    