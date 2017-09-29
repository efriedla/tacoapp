'use strict';
module.exports = function(sequelize, DataTypes) {
  var taco = sequelize.define('taco', {
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    /////*********************************to add hooks first step for hooks
    hooks: {
      beforeCreate: function(taco, options, cb){
        taco.name = taco.name.toUpperCase();

        //use callback to pass updated object morgan
        cb(null, taco);
      }
    }
  });
  return taco;
};
