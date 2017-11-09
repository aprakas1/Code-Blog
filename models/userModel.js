var orm = require("../config/orm.js");

console.log("posts MOdel loaded");


var userModel = {

  getAuthors: function(cb) {

        orm.getAuthors(function(result) {

            cb(result);

        });
    },

    



} 

module.exports = userModel;