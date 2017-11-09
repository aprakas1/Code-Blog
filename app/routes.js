// app/routes.js

var mysql = require('mysql');
var async = require('async');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var orm = require("../config/orm.js");
var postModel = require("../models/postModel.js");
var userModel = require("../models/userModel.js");
var commentsModel = require("../models/commentsModel.js");
var nodeMailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var mailer = require("../config/smtpCfg.js");




var path = require("path");
module.exports = function(app, passport) {

    // =====================================

    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {

        // postModel.selectAll(function(data) {
        postModel.getAllBlogJoin(function(data) {

            // move this to fn outside of routes
            // gets unique names and id's for passing to handlebars

            var list = [];
            var list2 = [];
            users = {};
            for (var i = 0; i < data.length; i++) {
                list.push(data[i].authorId);
                list2.push(data[i].fName);

            }
            let unique = [...new Set(list)]
            let unique2 = [...new Set(list2)]
            for (var i = 0; i < unique.length; i++) {
                users[i] = { 'userId': unique[i], 'fName': unique2[i] }

            }


            var hbsObject = {
                post: data,
                authors: users
            };
            res.render('index.handlebars', hbsObject); // load the index.handlebars file

        });
    });

    //image upload
    



    // Contact form email

    app.post('/api/send-contact-email', function(req, res) {

        let transporter = nodeMailer.createTransport(sgTransport(mailer.smtpCfg));
        let mailOptions = mailer.contactMail;
        mailOptions.text = "Name: " + req.body.name + "\nEmail : " + req.body.email + "\nGithub: " + req.body.github + "\nComments: " + req.body.comments;
        // mailOptions.html = "<p> Name: " + req.body.name + "\nEmail : " + req.body.email + "\nGithub: " + req.body.github + "\nComments: " + req.body.comments; + "</p>";// let mailer.smtp = req.body.body;

        console.log(mailOptions);

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
        });
    });

    // author pages

    app.get('/pages', function(req, res) {

        res.render('pages.handlebars');
    });

    app.get('/pages/:author', function(req, res) {

        var author = req.params.author;
        postModel.getMyBlogsJoin(author, function(data) {

            var hbsObject = {
                blog: data,
                user: req.user

            };

            res.render('pages.handlebars', hbsObject);
        });

    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.handlebars', { message: req.flash('loginMessage') });

    });

    // process the login form for regular users
    app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/profile', // redirect to the secure profile section
            failureRedirect: '/login', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // admin login
    // process the login form for admin users
    app.post('/admin/login', passport.authenticate('local-admin', {
            successRedirect: '/admin/profile', // redirect to the secure profile section
            failureRedirect: '/admin/login', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

        // show the login form
    app.get('/admin/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('admin-login.handlebars', { message: req.flash('loginMessage') });

    });

        app.get('/admin/profile', isLoggedIn, function(req, res) {

        // postModel.getMyBlogs(req.user.id, function(data) {
        userModel.getAuthors(function(data) {

            var hbsObject = {
                bloggers: data,
                user: req.user
                // user: req.user
            };
            // console.log(hbsObject);
            console.log(req.user.id + " req.user.id )))")

            res.render("admin-profile.handlebars", hbsObject);


        });
    });





    // about page

    app.get('/contact', function(req, res) {

        postModel.getAllBlogers(function(data) {

            var hbsObject = {
                authors: data
                

            };

            console.log(hbsObject)

            res.render('contact.handlebars', hbsObject);
        });



    });

    app.get('/about', function(req, res) {

        postModel.getAllBlogers(function(data) {

            var hbsObject = {
                authors: data
                

            };

            console.log(hbsObject)

            res.render('about.handlebars', hbsObject);
        });



    });


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.handlebars', { message: req.flash('signupMessage') });
    });



    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));



    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {

        // postModel.getMyBlogs(req.user.id, function(data) {
        postModel.getMyBlogsJoin(req.user.id, function(data) {

            var hbsObject = {
                post: data,
                user: req.user
                // user: req.user
            };
            // console.log(hbsObject);
            console.log(req.user.id + " req.user.id )))")

            res.render("profile.handlebars", hbsObject);


        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // Posting Section=========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)


    app.post('/api/post/', isLoggedIn, function(req, res) {
        // app.post('/api/post/', function(req, res) {


        var title = req.body.title;
        var content = req.body.content;
        var tags = req.body.tags;
        var status = req.body.status;
        var createTime = req.body.createTime;
        var authorId = req.user.id;

        console.log(authorId + " this is the authorid")
        console.log(content + " this is the content")

        postModel.addBlogPost(title, content, tags, status, createTime, authorId, function() {


            res.redirect('/profile');
        });

    });

    //get this working

      //need to call this from ajax and not link on html
         app.get('/api/post/delete/:id', isLoggedIn, function(req, res) {


        var postId = req.params.id;
        var authorId = req.user.id;


        postModel.deleteOne(postId, authorId, function() {


            res.redirect('/profile');
        });

    });

    //add comment
    // app.post('/api/post/:id', isLoggedIn, function(req, res) {
    app.post('/api/comment/', function(req, res) {


        var comment = req.body.comment;
        var createTime = req.body.createTime;
        var postId = req.body.postId;
        var authorId = req.user.id;

        console.log(authorId + " this is the authorid")
        console.log(comment + " this is the content")

        commentsModel.addComment(comment, createTime, authorId, postId, function() {
            // commentsModel.addComment(comment, createTime, postId, function() {


            res.redirect('/profile'); // redirect back to post if possible
        });

    });

    //single blog page
    // authenticated user gets to leave comments
    app.get('/view/:id', isLoggedIn2, function(req, res) {
        // app.get('/view/:id', function(req, res) {

        var id = req.params.id;
        console.log(req.params.id + " req.params.id )))")
        console.log(req.user.id + " req.user )))")


        postModel.getOneBlogJoin(id, function(data) {


            var hbsObject = {
                blog: data,
                user: req.user

            };

            console.log(req.params.id + " req.user.id )))")

            res.render("single.handlebars", hbsObject);

        });
    });

    //single blog page
    // authenticated user gets to leave comments
    // app.get('/view/:id', isLoggedIn, function(req, res) {
    app.get('/guest/view/:id', function(req, res) {

        var id = req.params.id;
        console.log(req.params.id + " req.params.id )))")
         console.log(req.user + " req.user )))")


        postModel.getOneBlogJoin(id, function(data) {

            //look into route validator 

            if (data.length == 0) {

                console.log(data.length);
                // res.render("/");
                return res.status(404).end();
            } else {
                var hbsObject = {
                    blog: data
                    // user: req.user
                    // authorized: // user: req.user
                };
                console.log(data.length);
                res.render("singleGuest.handlebars", hbsObject);
            }




        });
    });








    //github stuff

    // app.get('/auth/github', passport.authenticate('github', { scope: ['user:username'] }));

    // app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // app.get('/auth/github/callback',
    //     passport.authenticate('github', { failureRedirect: '/login' }),
    //     function(req, res) {
    //         // Successful authentication, redirect home.
    //         res.redirect('/profile');
    //     });


    // async testing  DOING THIS TO TRY AND LOAD COMMENTS ON BLOG PAGE FOR HANDLEBARS

    // app.get('/api/test/view/:id', function(req, res) {

    //     var id = req.params.id;


    //     async.parallel([
    //         // getBlogPost: 
    //         function(callback) {
    //             postModel.getOneBlog(id, function(data) {

    //                 var hbsObject = {
    //                     blog: data,
    //                     user: req.user
    //                     // authorized: // user: req.user
    //                 };

    //                 return callback;

    //             });


    //         },
    //         // getBlogComments: 
    //         function(callback) {

    //             commentsModel.getComments(id, function(data) {

    //                 console.log(id + " ---------------------Should be postId--");

    //                 // var hbsObject = {
    //                 //     blog: data,
    //                 //     user: req.user

    //                 // };

    //             });

    //         }
    //     ], function(err, results) {
    //         if (err)
    //             return res.send(500);
    //         // results === { universityData: { ... }, courseData: { ... } }
    //         // res.render('course', results);

    //         console.log(results[0] + "============================================================");
    //         res.render("single2.handlebars", results);
    //     });
    // });

    // app.get('/api/test/view/:id', function(req, res) {

    //     var id = req.params.id;




    //     commentsModel.getComments(id, function(data) {

    //         console.log(data + " ---------------------Should be postId--");

    //         var hbsObject = {
    //             blog: data,
    //             user: req.user

    //         };

    //     });


    //     // results === { universityData: { ... }, courseData: { ... } }
    //     // res.render('course', results);

    //     console.log(hbsObject + "============================================================");
    //     res.render("single2.handlebars", hbsObject);
    // });
    // });



};





// route middleware to make sure
function isLoggedIn(req, res, next) {

console.log(req);
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())

        return next();

    // if they aren't redirect them to the home page
    console.log("redirect due to not logged in")
    res.redirect('/');
}

// route middleware to make show guest page without comments otion for unathenticated users
function isLoggedIn2(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())

        // authenticated = true;
        // this.myVar = myVar;
        


        return next();
    // var id =
    // if they aren't redirect them to the home page
    console.log("redirect due to not logged in")
    var redirect = '/guest/view/' + req.params.id;
    res.redirect(redirect);
}