const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

// this creates the express app so that you can use express
const app = express();
app.use(bodyParser.urlencoded({extended: true}));






app.listen(3000, function() {
    console.log("Server running on port 3000");
});