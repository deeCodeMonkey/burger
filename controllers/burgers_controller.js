var express = require("express");
var router = express.Router();

var burger = require("../models/burger.js");

// routes.

router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        //data returned, assign to burger property of object 'hbsObject'
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req, res) {
    //columns prescribed (post will have values)
    burger.insertOne('burger_name', req.body.burger_name, function (result) {
            // Send back the ID of the new burger
            res.json({ id: result.insertId });
        });
});

router.put("/api/eatenBurgers/:id", function (req, res) {
    var condition = "id = " + req.body.id;
    burger.updateOne(
        'devoured = true', condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


module.exports = router;