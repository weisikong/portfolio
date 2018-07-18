const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
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

app.get("/about", (req, res) => {
    res.render("about", {});
});

app.get("/projects", (req, res) => {
    res.render("projects", {});
});

app.get("/contact", (req, res) => {
    res.redirect("mailto:venus.kong.dev@gmail.com");
});

app.use((req, res) => {
    res.status(404).send("<img src='https://cdn-images-1.medium.com/max/1600/1*dMtM0XI574DCyD5miIcQYg.png' alt='Page not found' >");
});

app.listen(HTTP_PORT, onHttpStart);