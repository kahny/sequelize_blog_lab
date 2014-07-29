var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , env       = process.env.NODE_ENV || 'development'
  , config    = require(__dirname + '/../config/config.json')[env]
  , sequelize = new Sequelize(config.database, config.username, config.password, config)
  , db        = {}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

// console.log(db)
db.post.hasMany(db.author); //connecting foreign key


// //testing author 
// db.author.create({name: "Connie"}).success(function(author){
//   console.log(author);
// })

// //testing post 
// db.post.create({title:"Today's day", content:"about my day.."})


//add from routes to place holders 
db.post.create({title:"Never ending story ", content:"la"})
  .success(function(post){
    db.author.find(1).success(function(author){
      author.setPosts([post])     //setposts sequelize method
      .success(function(author) {
        console.log(author)
      });
    });
  });







module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)
