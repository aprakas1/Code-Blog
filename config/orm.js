var cnx = require('./connection.js');

console.log("orm.js loaded");


var orm = {

    selectAll: function(whatToSelect, tableInput, cb) {

        var queryString = "SELECT " + whatToSelect + " FROM ??";
        cnx.query(queryString, tableInput, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);

        });


    },
    getMyBlogs: function(authorId, cb) {

        var queryString = "SELECT id, title, content, tags, status, createTime, updateTime, authorId FROM blog_db.post WHERE ?";

        cnx.query(queryString, [
            //where statement
            { authorId: authorId }
        ], function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);

        });


    },

    // admin functions

     getAuthors: function(cb) {

        var queryString = "SELECT id, username, email, fName, lName, superUser, status FROM blog_db.user";

        cnx.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);

        });


    },

    //use this to dynamically populate featured blog drop down

    getAllBlogers: function(cb) {

        var queryString = "SELECT id AS userId, username, fName, lName, email FROM blog_db.user WHERE status = 1 and superUser = 0";

        cnx.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);

        });


    },
    getMyBlogsJoin: function(authorId, cb) {

        var queryString = "SELECT blog_db.post.id AS postID, blog_db.post.title, blog_db.post.content, blog_db.post.createTime, blog_db.post.updateTime, blog_db.post.authorId ,blog_db.user.username, blog_db.user.fName FROM blog_db.post LEFT JOIN blog_db.user ON blog_db.post.authorId = blog_db.user.id HAVING ?";

        cnx.query(queryString, [
            //where statement
            { authorId: authorId }
        ], function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);

        });


    },

    getOneBlog: function(postId, cb) {

        var queryString = "SELECT id, title, content, tags, status, createTime, updateTime, authorId FROM blog_db.post WHERE ?";

        cnx.query(queryString, [
            //where statement
            { id: postId }
        ], function(err, result) {
            if (err) {
                throw err;
            }
            console.log(result);

            cb(result);

        });


    },
    // returns single blog post and user information
    getOneBlogJoin: function(postId, cb) {

        var queryString = "SELECT blog_db.post.id AS postID, blog_db.post.title, blog_db.post.content, blog_db.post.createTime, blog_db.post.updateTime, blog_db.post.authorId, blog_db.user.username, blog_db.user.fName FROM blog_db.post LEFT JOIN blog_db.user ON blog_db.post.authorId = blog_db.user.id HAVING ?"

        // var queryString = "SELECT id, title, content, tags, status, createTime, updateTime, authorId FROM blog_db.post WHERE ?";

        // var blogPostId = 'blog_db.post.id'

        cnx.query(queryString, [
            //where statement
            { 'post.id': postId }
        ], function(err, result) {
            if (err) {
                throw err;
            }
            // console.log("==============" + result);

            cb(result);

        });


    },

    // returns all vblog posts and user information
    getAllBlogJoin: function(cb) {

        var queryString = "SELECT blog_db.post.id AS postID, blog_db.post.title, blog_db.post.content, blog_db.post.createTime, blog_db.post.updateTime, blog_db.post.authorId, blog_db.user.id, blog_db.user.username ,blog_db.user.fName FROM blog_db.post LEFT JOIN blog_db.user ON blog_db.post.authorId = blog_db.user.id";

        // var queryString = "SELECT id, title, content, tags, status, createTime, updateTime, authorId FROM blog_db.post WHERE ?";

        // var blogPostId = 'blog_db.post.id'

        cnx.query(queryString
            //     , [
            //     //where statement
            //     { 'post.id': postId }
            // ]
            ,
            function(err, result) {
                if (err) {
                    throw err;
                }
                console.log(result);

                cb(result);

            });


    },





    insertOne: function(table, burgers_name, devoured, cb) {

        var queryString = "INSERT INTO " + table + " SET ?";

        var newBurger = {
            burgers_name: burgers_name,
            devoured: devoured
        };
        cnx.query(queryString, newBurger, function(err, result) {

            if (err) {
                throw err;
            }

            cb(result);
        });

    },

    //for blog

    addBlogPost: function(title, content, tags, status, createTime, authorId, cb) {

        var queryString = "INSERT INTO blog_db.post SET ?";

        var newBlogPost = {
            title: title,
            content: content,
            tags: tags,
            status: status,
            createTime: createTime,
            authorId: authorId
        };

        console.log(queryString);
        console.log(newBlogPost);

        cnx.query(queryString, newBlogPost, function(err, result) {

            if (err) {
                throw err;
            }

            cb(result);
        });

    },

    //Get comments for post

    getComments: function(postId, cb) {

        var queryString = "SELECT id, comment, createTime, update_time, authorId FROM blog_db.comment WHERE ?";

        cnx.query(queryString, [
            //where statement
            { postId: postId }
        ], function(err, result) {
            if (err) {
                throw err;
            }
            console.log(result);

            cb(result);

        });


    },

    // add comment to post
    addComment: function(comment, createTime, authorId, postId, cb) {
        // addComment: function(comment, createTime, postId, cb) {

        var queryString = "INSERT INTO blog_db.comment SET ?";

        var newComment = {

            comment: comment,
            createTime: createTime,
            authorId: authorId, // add back
            postId: postId
        };

        console.log(queryString);
        console.log(newComment);

        cnx.query(queryString, newComment, function(err, result) {

            if (err) {
                throw err;
            }

            cb(result);
        });

    },


    deleteOne: function(postId, authorId, cb) {

        var queryString = "DELETE FROM blog_db.post WHERE ? AND ?";

        cnx.query(queryString, [{ id: postId },
                //and prevent other loggedin users from deleting my posts
                { authorId: authorId }
            ],

            function(error, results) {
                if (error) throw error;
                cb(results);

            })


    },

    //update blog post

    updateOne: function(content, postID, cb) {

        var queryString = "UPDATE blog_db.post SET ? WHERE ?";

        cnx.query(queryString, [{ content: content, },
                //WHERE Clause
                { id: postID }
            ],

            function(error, results) {
                if (error) throw error;
                cb(results);

            });


    },







}


module.exports = orm;



   