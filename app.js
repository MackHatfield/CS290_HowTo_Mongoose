const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

let app = express();
let {PORT, IP} = process.env;

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static((__dirname, 'client')));



app.listen(PORT, IP, function() {
    console.log(`Server running on PORT: ${PORT} at IP: ${IP}`);
})