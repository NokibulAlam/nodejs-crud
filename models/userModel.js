const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);



// const  db = require("../database").db;

// class User { 
//     constructor(name) {
//         this.name = name;
//     }

//     save() {
//         db.collection("user").insertOne(this)
//         .then( result => {
//             console.log("Data Saved Properly");
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }
// }



// module.exports = User;