const users = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const login = async(req, res) => {
    try{
        const {email, password} = await req.body;
        if(!email || !password)
            return res.status(400).json({message: "Please enter all fields"});
        const user = await users.findOne({email});
        if(!user) return res.status(400).json("User does not exist");
        const {name} = user;
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch)
        {
            const token = await jwt.sign({email: user.email, id: user._id}, SECRET_KEY, {expiresIn: '24h'});
            res.status(200).json({token, name});
        }
        else{
            res.status(401).json("Incorrect Password");
        }
    }
    catch(err){
        console.log(err);
    }
};

const signup = async(req, res) => {
    try{
        const {name, email, password} = await req.body;
        if(!name || !email || !password) { return res.status(400).json({message: "Please fill all the fields"})};
        const ifExists = await users.findOne({email});
        if(ifExists) return res.status(401).json("User already exits.");
        const round = 10;
        const hashPassword = await bcrypt.hash(password, round);
        const newUser = new users({name, email, password: hashPassword});
        await newUser.save();
        res.status(200).json("Account Created");
    }catch(err){
        console.log(err);
    }
};

module.exports = {login, signup};
