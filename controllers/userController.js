const User = require('../models/userModel');


exports.getIndex = ((req, res, next) => {
    const login = false;
    if(req.get("Cookie")) {
        login = req.get("Cookie").split("-")[1];
    }
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


exports.getLogin = ((req, res, next) => {
    return res.send('<form method="POST" action="/user"><input type="text" placeholder="Enter Your Name" name="userName"><button type="submit">Submit</button></form>');
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
            loggedIn: 1,
            user: data,
        })
    })
    .catch(err => {
        console.log(err);
    });

    // console.log(_id);
});


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
    res.setHeader("Set-Cookie", "login-true");
    return res.redirect('/');
}