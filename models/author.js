function Author(sequelize, DataTypes){
  return sequelize.define('author', {
    username: DataTypes.STRING
  });
};	

module.exports = Author;


// this has an id field 