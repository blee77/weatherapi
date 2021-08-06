const express = require("express");
const bodyParser =require("body-parser");
const https = require("https");

const app = express();

app.use(express.urlencoded({extended:true}));

app.get("/", function(req,res){res.sendFile(__dirname + "/index.html")});

    app.post("/", function(req,res){

        const query = req.body.cityName;
        const apiKey = "2baecdaf0d274d1ee46dde1e09e6d95b";
        const units = "metric";
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query   + "&appid="+ apiKey+"&units=" + units;
        // const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+ "&appid="+ apiKey+"&units=" + units;

        https.get(url, function(response){console.log(response.statusCode);
        response.on("data", function(data){
            

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            // console.log(temp);

            res.write("<h1>The current weather forcast in " + query + " is, " + weatherDescription + ".</h1>");
            res.write("<h1>The current temperature is, " + temp + " degrees Celsius.</h1>");
            res.write("<img src="+ imgURL+ "></img>");
            res.send();
        });
        

    });



});

app.listen(3000, function(){console.log("The server started on port 3000")});