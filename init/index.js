const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
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

// const initDB = async () =>{
//     await Listing;
// }
// async function main(){
//     console.log(MONGO_URL);
//     await mongoose.connect(MONGO_URL);
//     console.log("connected to db");
// }
async function initDB(){
    await main();
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
    await mongoose.connection.close();
}

initDB().catch((err)=>{
    console.error(err);
    mongoose.connection.close();
});