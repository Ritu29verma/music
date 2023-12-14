const express = require("express");
const passport = require("passport");
const Playlist = require("../models/Playlist");
const router = express.Router();

// Route 1: Create a playlist
router.post("/create",passport.authenticate("jwt", {session: false}),async (req, res) => {
        const currentUser = req.user;
        const {name, thumbnail, songs} = req.body;
        if (!name || !thumbnail || !songs) {
            return res.status(301).json({err: "Insufficient data"});
        }
        const playlistData = {
            name,
            thumbnail,
            songs,
            owner: currentUser._id,
            collaborators: [],
        };
        const playlist = await Playlist.create(playlistData);
        return res.status(200).json(playlist);
    }
);

// Route 2: Get a playlist by ID
// we will get the playlist ID as a route parameter and we will return the playlist having that id
// /something1/something2/something3 --> exact match
// /something1/something2/something4 --> this will not call the api on the previus line
// If we are doing /playlist/get/:playlistId (focus on the :) --> this means that playlistId is now a variable to which we can assign any value
// If you call anything of the format /playlist/get/asdvniuen (asdvniuen can be anything), this api is called
// If you called /playlist/get/asdvniuen, the playlistId variable gets assigned the value asdvniuen.
router.get(
    "/get/playlist/:playlistId",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        // This concept is called req.params
        const playlistId = req.params.playlistId;
        // I need to find a playlist with the _id = playlistId
        const playlist = await Playlist.findOne({_id: playlistId});
        if (!playlist) {
            return res.status(301).json({err: "Invalid ID"});
        }
        return res.status(200).json(playlist);
    }
);


module.exports = router;
