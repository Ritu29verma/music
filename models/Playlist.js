const mongoose = require("mongoose");
//how to create a model
//step 1: require mongoose
//step 2: create a mongoose schema(structure of a user)
//step 3: create a model

const Playlist = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    thumbnail:{
        type: String,
        required: true,
    },
    track:{
        type: String,
        required: true,
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    // playlists ke song
    //playlist ke collaborators
    songs :[
        {
            type: mongoose.Types.ObjectId,
            ref:"Song",
        },
    ],
    collaborators:[
        {
            type: mongoose.Types.ObjectId,
            ref:"User",
        },
    ],
});

const PlaylistModel = mongoose.model("Playlist", Playlist);
module.exports = PlaylistModel;