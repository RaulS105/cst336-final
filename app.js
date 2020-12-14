
const express = require("express");
const app = express();
const pool = require("./dbPools.js");
const fetch = require("node-fetch");


app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));

//Routing
app.get("/", function(req, res){
	res.render("index.ejs");
});

//Score Page
app.get("/schedules", async function(req, res){

    let url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`;


    let response = await fetch(url);

    let data = await response.json();

    console.log(data);

    let scheduleArray = [];
    let nameArray = [];
    let dateArray = [];
    let venueArray = [];
    let homeTeamLogo = [];
    let awayTeamLogo = [];
    let homeTeamRecord = []
    let awayTeamRecord = [];

    let currentWeek = data.week.number;

    for( let i = 0; i < 16; i++) {
        scheduleArray.push(data.events[i].shortName)
        nameArray.push(data.events[i].name);
         dateArray.push(data.events[i].date);
         venueArray.push(data.events[i].competitions[0].venue.fullName);
        homeTeamLogo.push(data.events[i].competitions[0].competitors[0].team.logo);
        awayTeamLogo.push(data.events[i].competitions[0].competitors[1].team.logo);
        homeTeamRecord.push(data.events[i].competitions[0].competitors[0].records[0].summary);
        awayTeamRecord.push(data.events[i].competitions[0].competitors[1].records[0].summary);
    }


    res.render("schedules.ejs",{"currentWeek":currentWeek,"scheduleArray":scheduleArray, 
    "nameArray":nameArray, "dateArray":dateArray, "venueArray":venueArray, "homeTeamLogo":homeTeamLogo, 
    "awayTeamLogo":awayTeamLogo, "awayTeamRecord":awayTeamRecord, "homeTeamRecord":homeTeamRecord});
});

//Ticket Page
app.get("/tickets", function(req, res){
	res.render("tickets.ejs");
});


app.get("/store", function (req, res)
{
    res.render("store.ejs");


});

app.get("/api/updateTicketDatabase", function (req, res)
{
    let sql;

    let sqlParams;
    
    switch (req.query.action) {
    case "add": sql = "INSERT INTO ticket (price, teams) VALUES (?,?)";
                sqlParams = [req.query.price, req.query.teams];
                break;
    }

  
pool.query(sql, sqlParams, function (err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    res.send(rows.affectedRows.toString());
  });

});

app.get("/api/updateDatabase", function (req, res)
{
    let sql;

    let sqlParams;
    
    switch (req.query.action) {
    case "add": sql = "INSERT INTO merchandise (total, value) VALUES (?,?)";
                sqlParams = [req.query.total, req.query.value];
                break;
    }

  
pool.query(sql, sqlParams, function (err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    res.send(rows.affectedRows.toString());
  });

});


//Store
app.get("/store-results", function(req, res){
  
    res.render("store-results.ejs");
    
    
});

//Login
app.get("/login", function(req,res){
   
   res.render("login.ejs");
});


//Starting Server
app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Express server is running");
});