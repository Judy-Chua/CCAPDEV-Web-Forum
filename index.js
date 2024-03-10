const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/archerGuildDB')

const express = require('express')
const app = new express()


const Post = require("./database/models/Post")
const Comment = require("./database/models/Comment")
const User = require("./database/models/User")
const path = require('path') 


app.use(express.json()) // use json
app.use(express.urlencoded( {extended: true})); // files consist of more than strings
app.use(express.static('public')) // we'll add a static directory named "public"

var hbs = require('hbs')
app.set('view engine','hbs');

const date = new Date();
/*
Post.create({
    postId: 100,
    title: 'Doggy2',
    description: 'This is my dog2',
    comments:[],
    image: '/images/dog2.jpg',
    tag: 'nada2',
    upvotes: [],
    downvotes: [],
    popVal: 0,
    trendVal: 0,
    controVal: 0,
    date: date,
});
*/
/*
Comment.create({
    commentId: 12345,
    userId: 54321,
    theComment: "Hello World",
    upvotes: [1,2,3,4],
    downvotes: [4321],
    date: date,
    popVal: 45
});
*/
/*s
Post.create({
    postId: 101,
    title: 'Doggy',
    description: 'This is my dog',
    comments:[],
    image: '/images/dog1.jpg',
    tag: 'nada',
    upvotes: [],
    downvotes: [],
    popVal: 0,
    trendVal: 0,
    controVal: 0,
    date: date,
});

*/


/*
Comment.create({
    commentId: 12345,
    userId: 54321,
    theComment: "Hello World",
    upvotes: [1,2,3,4],
    downvotes: [4321],
    date: date,
    popVal: 45
});
*/





app.get('/', function (req, res) {
    res.sendFile(__dirname + '\\' + 'index.html');
});

app.get('/login-page.html', function(req, res){
    res.sendFile(__dirname + '\\' + 'login-page.html');
});

app.get('/signup-page.html', function(req, res){
    res.sendFile(__dirname + '\\' + 'signup-page.html');
});

app.get('/mainpage', async(req, res) => {
    const allPosts = await Post.find({})
    console.log(allPosts);
    res.render('mainpage',{allPosts})
    
});

var server = app.listen(3000, function () {
    console.log('Node server is running..');
});

