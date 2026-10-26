const express = require("express");
const router = express.Router();

//index - post
router.get("/", (req, res) => {
    res.send("hi i am post");
})

//show- post
router.get("/:id", (req, res) => {
    res.send("get for show post");
})

//post - post
router.post("/", (req, res) => {
    res.send("post for post");
})

//delete - post
router.delete("/:id", (req, res) => {
    res.send("delete for post");
});

module.exports = router;