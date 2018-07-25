const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const fs = require("fs");

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers:{
        navLink: function(url, options){
            return '<a class="nav-link ' + 
                ((url == app.locals.activeRoute) ? 'active" ' : '"') + 
                'href="' + url + '">' + options.fn(this) + '</a>';
        }
    }
}));

app.set('view engine', '.hbs');

app.use(express.static('public'));

//This will add the property "activeRoute" to "app.locals" whenever the route changes
app.use(function (req, res, next) {
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
});

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on port " + HTTP_PORT);
}

app.get("/", (req, res) => {
    res.render("home", {});
});

app.get("/script.js", (req, res) => {
    script = fs.readFileSync("script.js", "utf8");
    res.send(script);
})

app.get("/about", (req, res) => {
    res.render("about", {});
});

app.get("/blog", (req, res) => {
    res.render("blog", {});
});

app.get("/projects", (req, res) => {
    res.render("projects", {});
});

app.get("/contact", (req, res) => {
    res.redirect("mailto:venus.kong.dev@gmail.com");
});

app.use((req, res) => {
    //res.status(404).send("<img src='https://cdn-images-1.medium.com/max/1600/1*dMtM0XI574DCyD5miIcQYg.png' alt='Page not found' >");
    res.status(404).send("OMG!!!Page not found. Go back while you can! ");

});

app.listen(HTTP_PORT, onHttpStart);