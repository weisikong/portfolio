const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
}));

app.set('view engine', '.hbs');

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
    res.send("Hello World!");
});

app.listen(HTTP_PORT);