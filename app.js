const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
var items = ["Problem Solving", "Algorithms", "Web Devlopment"];
var workItems=[];

app.get("/", function (req, res) {
  ///res.send("Hello world");
  var today = new Date();
  var day = "";
  var currDay = today.getDay();
  /*
    switch(currDay)
    {
        case 0:
            day="Sunday";
            break;
        case 1:
            day="Monday";
            break;
        case 2:
            day="Tuesday";
            break;
        case 3:
            day="Wednesday";
            break;
        case 4:
            day="Thursday";
            break;
        case 5:
            day="Friday"
            break;
        case 6:
            day="Saturday";
            break;
        default:
            console.log("Default val "+ currDay);
            break;

    }
    */
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  day = today.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, newListItems: items });
});

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work-List", newListItems: workItems});
})

app.get("/about", function(req,res){
    res.render("about")
})

app.post("/", function (req, res) {
  var item = req.body.newItem;

    if(req.body.list=="Work-List")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else
    {
        items.push(item);
        res.redirect("/");
    }
    console.log(req.body);
 
    console.log(item);
});



app.listen(3000, function () {
  console.log("Server Listening on port 3000");
});
