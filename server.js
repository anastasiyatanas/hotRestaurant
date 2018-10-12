const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

let tables = [];
let waitlist = [];

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservation", function (req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
});

app.post("/api/reservation", function (req, res) {
    var newReservation = req.body;
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    if (tables.length < 5) {   
        tables.push(newReservation);
        res.json(newReservation);
    } else {
        waitlist.push(newReservation);
        res.json(newReservation);
    }
});

app.get('/api/reservation', function (req, res) {
    res.json(tables);
});

app.get('/api/waitlist', function (req, res) {
    res.json(waitlist);
});

app.get("/api/reservation/:table", function (req, res) {
    var chosenTables = req.params.table;
    console.log(chosenTables);
    for (var i = 0; i < tables.length; i++) {
        if (chosenTables === tables[i].routeName) {
            return res.json(tables[i]);
        }
    }
    return res.json(false);
});

app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});