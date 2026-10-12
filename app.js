const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname , "public")));

main()
    .then(()=>{
        console.log("connected to db");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main(){
    console.log(MONGO_URL);
    await mongoose.connect(MONGO_URL);
}

app.get("/" , (req , res )=>{
    res.send("hi i am root") ;
})

//index route
app.get("/listings" , async (req,res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index" , {allListings});
})
//New route
app.get("/listings/new" , (req , res)=>{
    res.render("listings/new");
})

//show route
// app.get("/listings/:id"  ,async(req,res)=>{
//     let {id} = req.params ;
//     const listing = await Listing.findById(id);
//     res.render("listings/show" , {listing});
// })

app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
});

//create route
app.post("/listings" , wrapAsync(async(req ,res , next)=>{
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}))

//update -> edit and update route
//edit route -- get request 
app.get("/listings/:id/edit" , async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id) ; 
    res.render("listings/edit.ejs" , {listing});
})

//update route
app.put("/listings/:id" , async(req , res)=>{
    let {id} = req.params ;
    await Listing.findByIdAndUpdate(id , {...req.body.listing}); 
    // res.redirect("/listings");    
    res.redirect(`/listings/${id}`);
})

//delete route
app.delete("/listings/:id" , async(req ,res)=>{
    let {id} = req.params ;
    const deletedListing = await Listing.findByIdAndDelete(id);
    //console.log(deletedListing);
    res.redirect("/listings");
})


// app.get("/testListing" , async (req , res )=>{
//     let sampleListing = new Listing({
//         title : "My New Villa", 
//         description : "By the beach" ,
//         price : "12000" ,
//         location : "Goa" ,
//         country : "India" ,
//     })
//     await sampleListing.save() ;
//     console.log("Sample was Saved") ,
//     res.send("succesful testing")
// })

app.use((err , req,res ,next)=>{
  res.send("something went wrong !!!!");  
})  
app.listen(2000 , ()=>{
    console.log("server is listening to port 2000")
})