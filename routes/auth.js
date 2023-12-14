const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {getToken} = require("../utils/helpers");
// this POST route will help you to register a user
router.post("/register" , async (req,res) => {
//this code will run when the /register api is called as a POST request
//my req body will be of the format (email,password etc.)
const{email, password, firstname, lastname,username}= req.body;

// step 2: does a user with this email already exist. If yes ,then throw an error.
const user = await User.findOne({ email: email });
if (user){
    //status code  by default is 200
    return res.status(404)
    .json({error:"A user with this email already exist."});
}

//this is a valid request
//step 3: create a new user in the DB
//we do not store password in plain text.
//we will use bcrypt to hash the password
const hashedPassword = await bcrypt.hash(password , 10);
const newUserData = {email,password: hashedPassword, firstname , lastname , username,};
const newUser = await User.create(newUserData);

//step 4: we want to create a token to return to the user.
const token = await getToken(email,newUser);

//step 5: Return the result to get the user
const userToReturn = {...newUser.toJSON(), token};
delete userToReturn.password;
return res.status(200).json(userToReturn);
});

router.post("/login", async (req,res)=>{
//get email and password send by user from req.body
const {email, password} = req.body;
//check user with given email exists or not
const user = await User.findOne({email:email});
if(!user){
    return res.status(404).json({err:"Invalid Password"});
}
console.log(user);
//if user exist check password is correct or not
const isPasswordValid = await bcrypt.compare(password,user.password);
if(!isPasswordValid ){
    return res.status(404).json({err:"Invalid Password"});
}
//it considered to be a good practice if both the errors are same
//if password is correct create a token and return it to the user
const token = await getToken(user.email,user);
const userToReturn = {...user.toJSON(), token};
delete userToReturn.password;
return res.status(200).json(userToReturn);
});
module.exports = router;
