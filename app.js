const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

let app = express();
let {PORT, IP} = process.env;

app.listen(PORT, IP, function() {
    console.log(`Server running on PORT: ${PORT} at IP: ${IP}`);
})