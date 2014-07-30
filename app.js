var express = require("express"),
db = require("./models/index.js"),
ejs = require('ejs'),
bodyParser = require('body-parser'),
app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded()); 
app.use(express.static(__dirname + '/public'));



app.get("/blog", function(req,res){
	db.post.findAll().success(function(posts){
    res.render('index', {posts: posts})
  })
})



//index .. need to make ejs file to print 

app.get("/newposts", function(req, res){
	res.render('post')
})

app.post("/newposts", function(req,res){
	console.log('this is the req.body');
	var user = req.body.username
	var title = req.body.postTitle
	var content = req.body.postContent
		db.author.findOrCreate({username: user}).success(function(author){
			db.post.create({title: title, content: content, authorId: author.id}).success(function(post) {
      	res.redirect('/blog');
      });
		})
	})





app.listen(3000, function(){
  console.log("SERVER listening on 3000")
})