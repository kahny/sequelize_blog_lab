function Post(sequelize, DataTypes){
  return sequelize.define('post', {
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  	authorId: {
    	type: DataTypes.INTEGER,
    	foriegnKey: true
  	}
  });
};

module.exports = Post;


// this has an id field 