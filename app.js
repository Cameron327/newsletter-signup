const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

// this creates the express app so that you can use express
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/hoopla', function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    // in order to send data to mailchimp, it has to be in a flatpack json object form
    // and then the names of the keys have to be exactly what it wants (what the documentation says)
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };
    const flatJson = JSON.stringify(data);
    // Finished getting the data from the user and compressing it

    // Then we define a request function
    const url = "https://us1.api.mailchimp.com/3.0/lists/3d23defc51";
    const options = {
        method: "POST",
        auth: "cam327:a1f4236bb3ee6376c3038341f73a6ec1-us1"
    };
    const request = https.request(url, options, function(response) {
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });

    // This is what we use to actually call that http request and use it and send the data
    request.write(flatJson);
    request.end();

});

// Api key
// a1f4236bb3ee6376c3038341f73a6ec1-us1

// List ID
// 3d23defc51


app.listen(3000, function() {
    console.log("Server running on port 3000");
});