

exports.getUser = (req, res, next) => {
    return res.status(200).json([{ name: "Nokib", age: 25 }, { name: "Himel", age: 26 }, { name: "Adit", age: 24 }]);
};

exports.postUser = (req, res, next) => {
    const name = req.body.name;
    const age = req.body.age;

    console.log(name, age);

    return res.status(201).json({
        msg: "User Created",
    })
}