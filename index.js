// npm init : package.json -- this is a node project.
//npm i express: expressJs package finally installed.--project came to know we are using express.
//we finally use express.

const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");    
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
require("dotenv").config();
const app = express();
const bodyParser = require('body-parser');
const port = 8080;

app.use(express.json());

//connect your mongodb with your node app
// mongoose.connect() takes 2 arguments : 1. which db to connect to(db url) 2. connnection options
mongoose.connect("mongodb+srv://ritu1298verma:Ritans2903@cluster0.3jrsa6a.mongodb.net/?retryWrites=true&w=majority",
)

.then((x) =>{
    console.log("Connected to Mongo!");
})
.catch((err) =>{
    console.log(err);
});

// setup password-jwt

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "ThisKeyIsSupposedBeSecret";
passport.use(new JwtStrategy(opts,  async function(jwt_payload, done) {
 User.findOne({id: jwt_payload.sub})
        //done(error, doestheuserexist)
        .then(user =>{
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }})
        
        .catch (err => {
            return done(err, false);
        });
    }
));

// API : Get type : / : 
app.get("/", (req, res) => {
    res.send( "Hello World!" );
    });

    app.use("/auth", authRoutes);
    app.use("/song", songRoutes);
    app.use("/playlist", playlistRoutes);
    app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

    app.listen( port, () => {
            console.log(` App is running on http://localhost:${port}`);

        });