const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");


const listing = require("./routes/listing.js");
const review = require("./routes/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

main()
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    console.log(MONGO_URL);
    await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
    res.send("hi i am root");
})

app.use("/listings", listing);

app.use("/listings/:id/reviews", review);

app.all("/{*splat}", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found !!!"));
});

app.use((err, req, res, next) => {
    console.log("Error statusCode:", err.statusCode);
    console.log("Error message:", err.message);

    let {
        statusCode = 500,
        message = "Something went wrong!"
    } = err;
    res.status(statusCode).render("listings/error.ejs", { message });
    //res.status(statusCode).send(message);
});

app.listen(2000, () => {
    console.log("server is listening to port 2000")
})