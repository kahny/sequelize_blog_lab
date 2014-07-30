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
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

// console.log(db)
//connecting foreign key
db.author.hasMany(db.post);
db.post.belongsTo(db.author);

// testing author 
// db.author.create({username: "JRRTolkien"}).success(function(author){
//   console.log(author);
// })

//testing post 
// db.post.create({title:"Today's a day", content:"about my day.."})


// addding a post and linking it to an id 
// db.post.create({title:"Today's a day", content:"About my day.."})
//   .success(function (post){
//     db.author.find(1).success(function (author){
//       author.setPosts([post])     //setposts sequelize method
//       .success(function(author) {
//         console.log(author);
//       })
//     });
//   });





module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)
