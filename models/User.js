const mongoose = require("mongoose");
//how to create a model
//step 1: require mongoose
//step 2: create a mongoose schema(structure of a user)
//step 3: create a model

const User = new mongoose.Schema({
   firstname: {
    type: String,
    required: true,
    },
    lastname: {
        type: String,
        required: true,
        },
        password:{
            type: String,
            required: true,
            private: true,
        },
    email:{
        type: String,
        required: true,
        },
            username:{
                type: String,
                required: true,
            },  
            likedsongs:{
            type: String,
            default: "",
            },
            likedplaylists:{
                type: String,
                default: "",
            } ,
            likedartists:{
                type: String,
                default: "",
            },
 
});
    

const UserModel = mongoose.model("User", User);
module.exports = UserModel;