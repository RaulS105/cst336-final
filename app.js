const express = require("express");
const app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));

//Routing
app.get("/", function(req, res){
	res.render("index.html");
});

//Score Page
app.get("/scores", function(req, res){
	res.render("scores.html");
});

//Ticket Page
app.get("/tickets", function(req, res){
	res.render("tickets.html");
});

//Store
app.get("/store", function(req, res){
	res.render("store.html");
});


//Starting Server
app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Express server is running");
});