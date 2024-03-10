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
    // uncomment this vvv for windows
    res.sendFile(__dirname + '\\' + 'index.html');

    // command for macos
    // res.sendFile(__dirname + '//' + 'index.html');
});

app.get('/login-page', async (req, res) => {
    const loggeduser = await User.findOne({ isLoggedIn: "1"});
    console.log(loggeduser);

    res.render("login-page", {loggeduser});
});

app.get('/signup-page', async (req, res) => {
    const loggeduser = await User.findOne({ isLoggedIn: "1"});
    console.log(loggeduser);

    res.render("signup-page", {loggeduser});
  });

app.get('/mainpage', async(req, res) => {
    const allPosts = await Post.find({})
    console.log(allPosts);

    const loggeduser = await User.findOne({ isLoggedIn: "1"});
    console.log(loggeduser);

    res.render('mainpage',{allPosts, loggeduser})
});

var server = app.listen(3000, function () {
    console.log('Node server is running..');
});

