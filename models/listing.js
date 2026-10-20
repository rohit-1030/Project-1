const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String ,
        required : true ,
    } ,
    description : String ,
    image : {
        filename : String ,
        url : {
            type : String ,
            default : "https://unsplash.com/photos/a-river-with-rocks-and-trees-9sLzwQl48yM",
        },
    },
    price : Number ,
    location : String ,
    country : String ,
})

const listing = mongoose.model("Listing" , listingSchema);
module.exports = listing ;