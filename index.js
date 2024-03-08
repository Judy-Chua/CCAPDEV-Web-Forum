const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/archerGuildDB')

const express = require('express')
const app = new express()


const Post = require("./database/models/Post")
const Comment = require("./database/models/Comment")
const User = require("./database/models/User")
const path = require('path') 


app.use(express.json()) // use json
app.use(express.static('public')) // we'll add a static directory named "public"

var hbs = require('hbs')
app.set('view engine','hbs');

Comment.create({
    commentId: 12345,
    userId: 54321,
    theComment: "Hello World",
    upvotes: [1,2,3,4],
    downvotes: [4321],
    date: 2022/12/12,
    popVal: 45
});



app.get('/', function (req, res) {
    res.sendFile(__dirname + '\\' + 'index.html');
});

var server = app.listen(3000, function () {
    console.log('Node server is running..');
});