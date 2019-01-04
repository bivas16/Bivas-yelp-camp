var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

/*var data = [
    {
        name : "Cloud Rest",
        image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. "
    },
    
    {
        name : "Lake  view",
        image: "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092__340.jpg",
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. "
    },
    
    {
        name : "van camper",
        image: "https://cdn.pixabay.com/photo/2016/11/21/14/31/vw-bus-1845719__340.jpg",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. "
    }
    
    ]*/

function seedDb(){
  //remove all campground
  Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("campground removed");
    // add campground
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
          if(err){
              console.log(err);
          }
          else{
              console.log("added a campground");
              //create a comment
             Comment.create(
                 {
                     text:"This place is nice ,i wish i had internet",
                     author: "Bivas"
                 }, function(err, comment){
                     if(err){
                         console.log(err);
                     } 
                     else{
                         campground.comments.push(comment);
                         campground.save();
                         console.log("created a new comment");
                     }
                 });
          }
      });
   })
});    

}

module.exports = seedDb; 