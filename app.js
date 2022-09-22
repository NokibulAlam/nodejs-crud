const express = require('express');
const userRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');
const cors = require('cors');

const app = express();

/* Text Field Parser */
app.use(express.urlencoded({ extended: false }));

/* For Accessing JSON data in Server */
app.use(express.json());

/* For CROSS Platform Server Connect */
app.use(cors());

/* For Uploading File */
const fileStorege = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req,  file, cb) => {
        cb(null, file.originalname);
    }
})
app.use(multer({storage: fileStorege}).single('image'));

const store = new MongoDBStore({
    uri: "mongodb://localhost:27017/testNode",
    collection: "session",
})

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
}));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(userRouter);
app.use('/api',apiRouter);

mongoose.connect("mongodb://localhost:27017/testNode", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(result => {
        // console.log("Connected");
        const server = app.listen(3000);
        const io = require('socket.io')(server);
        io.on('connection', socket => {
            console.log("Socket Connected - " + socket.id);
        })
    })
    .catch(err => {
        console.log(err);
    });


    