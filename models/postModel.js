var orm = require("../config/orm.js");

console.log("posts MOdel loaded");


var postModel = {


    selectAll: function(cb) {

        orm.selectAll("id, title, content, tags, status, createTime, updateTime, authorId", "post", function(result) {

            cb(result);

        });
    },

    getAllBlogers: function(cb) {

        orm.getAllBlogers(function(result) {

            cb(result);

        });
    },

    //  getAuthors: function(cb) {

    //     orm.getAuthors(function(result) {

    //         cb(result);

    //     });
    // },

    


    // need getAllBlogsJoin
    getAllBlogJoin: function(cb) {

        orm.getAllBlogJoin(function(result) {

            cb(result);

        });
    },

    getMyBlogs: function(id, cb) {

        orm.getMyBlogs(id, function(result) {

            cb(result);
            // console.log(result);

        });
    },

    getMyBlogsJoin: function(id, cb) {

        orm.getMyBlogsJoin(id, function(result) {

            cb(result);
            // console.log(result);

        });
    },

    getOneBlog: function(id, cb) {

        orm.getOneBlog(id, function(result) {

            cb(result);
            // console.log(result);

        });
    },

    getOneBlogJoin: function(id, cb) {

        orm.getOneBlogJoin(id, function(result) {

            cb(result);
            // console.log(result);

        });
    },
    //update
    // insertOne: function(name, devoured, cb) {
    //     orm.insertOne("post", name, devoured, function(result) {

    //         cb(result);
    //     })
    // },



    //updated for blog pp
    addBlogPost: function(title, content, tags, status, createTime, authorId, cb) {

        console.log("thisis from the post.js " + authorId);
        orm.addBlogPost(title, content, tags, status, createTime, authorId, function(result) {

            cb(result);
        })
    },
    //update
    updateOne: function(content, postID, cb) {
        orm.updateOne(content, postID, function(result) {

            cb(result);

        })



    },

    deleteOne: function(postID, authorId, cb) {
        orm.deleteOne(postID, authorId, function(result) {
            
            cb(result);


        })
    }

}


module.exports = postModel;