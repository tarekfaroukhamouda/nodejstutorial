const express=require("express");
const bodyParser=require("body-parser");
const https = require('https');

var app=express()
app.use(bodyParser({extended:true}))
app.get("/",(req,res)=>{
  res.sendfile("index.html",()=>{
    console.log("index is live now");
  })
})


app.post("/",(req,res)=>{
   var query=req.body.cityName;
   console.log(query)
   const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=a593f594a2f4acc3ae53d31ac183c4b8&units=metric&mode=json"
   https.get(url,(response)=>{

     response.on('data',(data)=>{
     const weatherData=JSON.parse(data);

      //console.log(weatherData.weather[0].description)
      res.write("<h1>The weather in "+query+" is "+weatherData.main.temp+" Degree</h1>");
      res.write("<h3>The Weather is curntly "+weatherData.weather[0].description+"</h3>");
      res.write("<img src='"+weatherData.weather[0].icon+".png'>")
      res.send();
     });
     console.log(response.statusCode);
   })
});
app.listen(3000,()=>{
  console.log("i m working")
});
