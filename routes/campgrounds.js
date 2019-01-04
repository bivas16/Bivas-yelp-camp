var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");

//INDEX ROUTE - show all the campgrounds
router.get("/campgrounds", function(req, res){
    //Get all the campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds});         
        }
    });
   
});

// CREATE ROUTE - add new campground to DB
router.post("/campgrounds", middleware.isLoggedIn , function(req, res){
    //get data from form 
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newcampground = {name: name, image: image, description: desc, author: author, price: price};
   //Create a new campground and save to DB
   Campground.create(newcampground,function(err, newlycreated){
       if(err){
           console.log(err);
       }
       else{
           //redirect to campgrounds page
           console.log(newlycreated);
           res.redirect("/campgrounds");
       }
   });
    
});

//NEW ROUTE - show the form to create new campground
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new.ejs"); 
});

//SHOW ROUTE - shows more info about one campground
router.get("/campgrounds/:id" , function(req,res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundcampground){
       if(err || !foundcampground){
           req.flash("error", "Campground not found !!");
           res.redirect("back");
       } 
       else{
           console.log(foundcampground);
           res.render("campgrounds/show.ejs", {campground:foundcampground});
       }
    });
    
});

//EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
          Campground.findById(req.params.id, function(err, foundCampground){
               res.render("campgrounds/edit.ejs", {campground: foundCampground});
});
});

//UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if(err){
          res.redirect("/campgrounds");
      }
      else{
          res.redirect("/campgrounds/" + req.params.id);
      }
   });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } 
      else{
          res.redirect("/campgrounds");
      }
   }); 
});



module.exports = router;