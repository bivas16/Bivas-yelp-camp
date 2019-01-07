var express       = require("express"),
    app           = express(),
    mongoose      = require("mongoose"),
    flash         = require("connect-flash"),
    bodyparser    = require("body-parser"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground    = require("./models/campground"),
    seedDb        = require("./seeds"),
    User          = require("./models/user"),
    Comment       = require("./models/comment");


//requiring routes
var commentRoutes    = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes      = require("./routes/index");

mongoose.connect(process.env.DATABASEURL);

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDb(); seed the database

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Once again colt is best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);


app.listen(process.env.PORT , process.env.IP , function(){
   console.log("The Yelp Camp Server has started !! "); 
});

