const express = require("express");
const app = express();
const user = require("./routes/users");
const post = require("./routes/post");
const cookieParser = require("cookie-parser")

app.use(cookieParser("secretcode"));

app.get("/getsignedcookie", (req, res) => {
    res.cookie("made-in", "india-delhi", { signed: true })
    res.send("signed cookie set");
})
app.get("/verify", (req, res) => {
    console.log(req.signedCookies);
    res.send("verified");
})

app.get("/getcookies", (req, res) => {
    res.cookie("greet", "hello");
    res.cookie("greetS", "hola");
    res.send("hi i am get cookies");
})
app.get("/", (req, res) => {
    console.dir(req.cookies);
    res.send("hi i am check cookies");
})

app.use("/users", user);
app.use("/post", post);

app.listen(3000, () => {
    console.log("server is listening to port 3000");
})
