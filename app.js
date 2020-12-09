const express = require("express");
const app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));
const fetch = require("node-fetch");

//Routing
app.get("/", function(req, res){
	res.render("index.html");
});

//Score Page
app.get("/scores", async function(req, res){
	
	let url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`;
    
    
    let response = await fetch(url);
    
    let data = await response.json();
          
    console.log(data);
    
    let scheduleArray = [];
    let nameArray = [];
    let dateArray = []
    
    let currentWeek = data.week.number;
    
    for( let i = 0; i < 13; i++) {
    	scheduleArray.push(data.events[i].shortName)
    	nameArray.push(data.events[i].name);
     	dateArray.push(data.events[i].date);
        // dateArray.push(data.events[i].competitions.broadcasts.market);
    }

	
	res.render("schedules.html",{"currentWeek":currentWeek,"scheduleArray":scheduleArray, 
	"nameArray":nameArray, "dateArray":dateArray});
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