const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

let app = express();
let {PORT, IP} = process.env;

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static((__dirname, 'client')));

// here is where we connect mongoose to mongodb
mongoose.connect('mongodb://localhost/blog_app');

// A huge advantage of using Mongoose is the ability to define what is called a Schema
// This lets us define a pattern for the documents used in our application.
let blogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

// photo link to demo: https://upload.wikimedia.org/wikipedia/commons/2/2a/Hummingbird.jpg

// This takes our blog schema and turns it into a model which is a class used to create documents 
let Blog = mongoose.model('Blog', blogSchema);

// Let's add a single "blog post" to the db and see what happens
// Blog.create({
//     title: 'My First Post Ever!',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Hummingbird.jpg',
//     body: 'Look at this beautiful blue hummingbird! It is awesome!',
//     created: Date.now()
// });

// Routes
app.get('/blogs/allBlogs', function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(blogs)
        }
    })
});

app.get('/blogs/:id', function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(blog);
        }
    })
})


app.listen(PORT, IP, function() {
    console.log(`Server running on PORT: ${PORT} at IP: ${IP}`);
});