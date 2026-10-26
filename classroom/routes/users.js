const express = require("express");
const router = express.Router();

//index - users
router.get("/", (req, res) => {
    res.send("hi i am users");
})

//show- users
router.get("/:id", (req, res) => {
    res.send("get for show users");
})

//post - user
router.post("/", (req, res) => {
    res.send("post for users");
})

//delete -users
router.delete("/:id", (req, res) => {
    res.send("delete for users");
});

module.exports = router;