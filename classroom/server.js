const express = require("express");
const app = express();
const user = require("./routes/users");
const post = require("./routes/post");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/register", (req, res) => {
    let { name = "anoynomus" } = req.query;
    req.session.name = name;
    req.flash("success", "user registered !!");
    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    res.render("page.ejs", { name: req.session.name });
});

// app.get("/reqcount", (req, res) => {
//     if (req.session.count) {
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);
// });

app.listen(3000, () => {
    console.log("server is listening to port 3000");
});
