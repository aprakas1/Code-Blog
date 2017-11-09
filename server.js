// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');




var app = express();
var port = process.env.PORT || 8080;

var passport = require('passport');
var flash = require('connect-flash');
var moment = require("moment");

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration



// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");
// date

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.engine('handlebars', exphbs({
    defaultLayout: "main",
    helpers: {
        // Function to do basic mathematical operation in handlebar
        // {{math @index "+" 1}}. {{burgers_name}} </div>
        math: function(lvalue, operator, rvalue) {
            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);
            return {
                "+": lvalue + rvalue,
                "-": lvalue - rvalue,
                "*": lvalue * rvalue,
                "/": lvalue / rvalue,
                "%": lvalue % rvalue
            }[operator];
        },
        // function to format date
        //{{formatDate createTime}}
        formatDt: function(timeToFormat) {

          return moment(timeToFormat).format("MMMM DD, YYYY");

        },

        getAuthors: function(data){

           //logic to get getAuthors
           var list = [];
           var list2 = [];
           users = {};
            for (var i = 0; i < data.length; i++) {
                list.push(data[i].authorId);
                list2.push(data[i].fName);

            }
            let unique =[...new Set(list)]
            let unique2 =[...new Set(list2)]

            for (var i = 0; i < unique.length; i++) {
                users[i] = {'userId': unique[i], 'fName': unique2[i]}
                
            }

            return users;

        },


    }
}));
app.set("view engine", "handlebars");




// required for passport
app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(function(req, res, next) {
    res.locals.user = req.user; // This is the important line

    next();
});
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);