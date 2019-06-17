var express=require('express');
var app=express();
var mysql = require('mysql');
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
//app.use('/csscodes',express.static(+'/static'));
app.use(express.static('static'))
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'darshan7575',  //your username
  database : 'pgf'         //the name of your db
});

app.post("/getcoordinates",function(req,res){

var  rating=req.body.rating;
  var cost=req.body.cost;
  var availability=req.body.availability;
  var sharing=req.body.sharing;
  var distance=req.body.distance;
  
 connection.query('SELECT * from pg where rating >= ? AND cost >= ? AND availability >= ? AND sharing <= ? AND distance<= ?',[rating,cost,availability,sharing,distance] , function(err, results) {
 if(err)
 {
     console.log(err);
 }
 var markers=[];
 console.log(results);
 for(var i=0;i<results.length;i++){
     markers.push(JSON.stringify({
      coords:{lat:results[i].lat,lng:results[i].lng},
      iconImage:'/home.png',
      content:'<h2>'+results[i].name+'</h2>'
    }))
 }
 res.render("main",{marker:markers});
 });
});
app.get("/",function(req,res)
{
   res.render("main",{marker:NaN});
});

app.listen(8080,function()
{
  console.log("Server running on 8080!");
});