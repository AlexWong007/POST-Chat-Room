import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let userMessageArray = ["Test_User", "Test_Message"];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    console.log("GET request received");
    res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    
    let textObj = {
        User: req.body.User,
        Message: req.body.Message
    }

    console.log(textObj.User);
    console.log(textObj.Message);

    userMessageArray.push(textObj.User);
    userMessageArray.push(textObj.Message);
    console.log(userMessageArray);

    if (userMessageArray.length > 14) {
        userMessageArray.shift();
        userMessageArray.shift();
    }
    res.render("index.ejs", {userMessageArray});
});

app.delete("/submit/lastItemDelete", (req, res) => {
    console.log("Item has been deleted");

    if (userMessageArray.length >= 2) {
        userMessageArray.pop();
        userMessageArray.pop();
        console.log(userMessageArray);
        res.redirect("/submit");
    }
});

app.listen(port, () => {
    console.log("You are listening on port " + port + ".");
});