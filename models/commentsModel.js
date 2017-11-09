var orm = require("../config/orm.js");

console.log("Comments Model loaded");

// need to update all of this


var commentsModel = {


    // selectAll: function(cb) {

    //     orm.selectAll("id, title, content, tags, status, createTime, updateTime, authorId", "post", function(result) {

    //         cb(result);

    //     });
    // },

      getComments: function(postId, cb) {

        orm.getComments(postId, function(result) {

            cb(result);
            console.log(result);

        });
    },


    //updated for blog pp
    addComment: function(comment, createTime, authorId, postId, cb) { // fix to include author id
         // addComment: function(comment, createTime,postId, cb) {

        
        orm.addComment(comment, createTime, authorId, postId, function(result) {
            // orm.addComment(comment, createTime, postId, function(result) {

            cb(result);
        })
    },
//update
    // updateOne: function(item_id, devoured, cb) {
    //     orm.updateOne("post", item_id, devoured, function(result) {

    //         cb(result);

    //     })



    // }

}


module.exports = commentsModel;