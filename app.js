const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

// this creates the express app so that you can use express
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/hoopla', function (req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    console.log(firstName);
    console.log(lastName);
    console.log(email);

});




app.listen(3000, function() {
    console.log("Server running on port 3000");
});