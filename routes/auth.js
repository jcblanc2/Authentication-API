const router = require("express").Router();
const User = require("../models/User");
const {registerValidation, loginValidation} = require("../utils/validation");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const verifyToken = require("../utils/verifyToken");

// Route register
router.post("/register", async (req, res) => {
    // validate the data
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the user already exists
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send({message: "Email already exists"});

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Crete a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try{
        const userSaved = await user.save();
        res.status(201).send({userId: user._id});
    }
    catch(err){
        res.status(400).send({message:err});
    }
});


// Route login
router.post("/login", async (req, res) => {
    // validate the data
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the user already exists
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send({message: "Email or Passord is wrong!"});

    // Check if the password is correct
    const hashedPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!hashedPassword) return res.status(400).send({message: "Email or Passord is wrong!"});

    // Create and assign a token
    const token = JWT.sign({userId: user._id}, process.env.JWT_SECRET);

    try{
        res.header('x-auth-token', token).status(200).send({token: token});
    }
    catch(err){
        res.status(400).send({message:err});
    }
});


// Get all users
router.get("/", verifyToken, async (req, res) => {
    try {
        const allUsers= await User.find();
        res.status(200).send(allUsers);
    } catch (error) {
        res.status(500).send({ message: "Error while getting users" });
    }
});


module.exports = router;
