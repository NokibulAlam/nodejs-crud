const User = require('../models/userModel');


exports.getIndex = ((req, res, next) => {
    // const login = true;
    // if(req.get("Cookie")) {
    //     login = req.get("Cookie").split("-")[1];
    // }

    const login = req.session.login;
    // console.log(login);
    User.find()
    .then(data => {
        return res.render("index", {
            value: "Nokibul",
            loggedIn: login,
            allUsers: data,
        })
    })
    .catch(err => {
        console.log(err);
    });
    
});


exports.createUser = ((req, res, next) => {
    return res.render('createUser');
});


exports.postUser = ((req, res, next) => {
    const user = new User({
        name: req.body.userName,
    });

    user.save()
    .then(() => {
        return res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
});


exports.getProfile = ((req, res, next) => {
    let _id = req.params.id;

    User.findById(_id)
    .then(data => {
        return res.render("showUser", {
            user: data,
        })
    })
    .catch(err => {
        console.log(err);
    });

    // console.log(_id);
});

/* For Updating Value in Database */
exports.postProfile = (req, res, next) => {
    let _id = req.params.id;

    User.findById(_id)
    .then(data => {
        data.name= req.body.userName;
        data.save();
        return res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
};


exports.deleteUser = (req, res, next) => {
    let _id = req.params.id;

    User.findByIdAndDelete(_id)
    .then(() => {
        return res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    })
};

/* For Cookies */

exports.getLogin = (req, res, next) => {
    return res.render("login");
};

exports.postLogin = (req, res, next) => {
    // res.setHeader("Set-Cookie", "login-true");
    req.session.login = true;
    return res.redirect('/');
};


/* For FileUploading */
exports.FileUpload = (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
}