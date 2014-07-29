var express = require("express"),
  db = require("./models/index.js"),
  app = express();

app.set("view engine", "ejs");

app.get("/authors", function(req,res){

db.author.findAll().success(function(authors){
    res.render('index', {authors: authors})
  })
	
})
//index .. need to make ejs file to print 




app.listen(3000, function(){
  console.log("SERVER listening on 3000")
})