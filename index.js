const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/archerGuildDB')

const express = require('express')
const app = new express()
module.exports = mongoose;

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
User.create({
    userId: 10000,
    username: 'Adri20',
    name: 'Adriel Manuel',
    password: 'FirstUser_01',
    profilePicture:'/images/user1.jpg',    
    description:'I am an undergraduate student in De La Salle University, taking a Computer Science degree focusing on software technology.',
    upvotes: [],
    downvotes: [],
    dateCreated: date
 });

User.create({
    userId: 10001,
    username: 'Clarisse35',
    name: 'Clarissa Albarracin',
    password: 'Dog<3',
    profilePicture:'/images/user2.jpg',    
    description:'I am a dog enthusiast! I love playing dog games!',
    upvotes: [],
    downvotes: [],
    dateCreated: date
});

User.create({
    userId: 10002,
    username: 'Judy89',
    name: 'Judy Chua',
    password: 'BetaTester_1O',
    profilePicture:'/images/user3.jpg',    
    description:'I am new to this forum. Nice to meet you all! :) ',
    upvotes: [],
    downvotes: [],
    dateCreated: date
});

Post.create({
    postId: 20000,
    postUser: 10002,
    title: 'Has anyone notice this dog?!',
    description: 'I was playing skyrim yesterday and saw this dog. I dont know his name but I call them Booster.',
    comments:[30000],
    image: '/images/skyrimdog.png',
    tag: ['Singleplayer'],
    upvotes: [10001],
    downvotes: [],
    popVal: 1,
    trendVal: 2,
    controVal: 3,
    date: date,
});

Post.create({
    postId: 20001,
    postUser: 10000,
    title: 'League of Legends New Patch Notes!',
    description: 'League of Legends Patch Notes! I hope TF gets nerfed. Cross fingers ',
    comments:[30001,30002],
    image: '/images/leaguenotes.png',
    tag: ['MOBA', 'Multiplayer'],
    upvotes: [10002],
    downvotes: [],
    popVal: 2,
    trendVal: 3,
    controVal: 1,
    date: date,
});

Post.create({
    postId: 20002,
    postUser: 10001,
    title: 'Teamfight Tactics New Patch Notes!',
    description: 'Teamfight Tactics Patch Notes! Will there be a new rotation this time around? ',
    comments:[],
    image: '/images/tftnotes.png',
    tag: ['MOBA', 'Multiplayer'],
    upvotes: [10002],
    downvotes: [],
    popVal: 3,
    trendVal: 1,
    controVal: 2,
    date: date,
});

Comment.create({
    commentId: 30000,
    userId: 10000,
    theComment: "The dog looks a K9. It must've been through tough times damn..",
    upvotes: [10000],
    downvotes: [],
    date: date,
    popVal: 1
});

Comment.create({
    commentId: 30001,
    userId: 10001,
    theComment: "Will look at them later. Thanks for the reminder!",
    upvotes: [10002,10000],
    downvotes: [],
    date: date,
    popVal: 2
});

Comment.create({
    commentId: 30002,
    userId: 10002,
    theComment: "Tf already got nerfed yet that man is still meta. I really hope they adjust him somehow.",
    upvotes: [10002,10001],
    downvotes: [],
    date: date,
    popVal: 3
});
*/




app.get('/', function (req, res) {
    // uncomment this vvv for windows
    res.sendFile(__dirname + '\\' + 'index.html');

    // command for macos
    //res.sendFile(__dirname + '//' + 'index.html');
});

app.get('/login-page', function(req, res){
    // uncomment this vvv for windows
    res.sendFile(__dirname + '\\' + 'login-page.html');

    // command for macos
    //res.sendFile(__dirname + '//' + 'index.html');
});

app.get('/login-page', function(req, res){
    // uncomment this vvv for windows
    console.log('you added html');
    res.sendFile(__dirname + '\\' + 'login-page.html');

    // command for macos
    //res.sendFile(__dirname + '//' + 'index.html');
    
});

app.get('/signup-page.html', function(req, res){
    // uncomment this vvv for windows
    res.sendFile(__dirname + '\\' + 'signup-page.html');

    // command for macos
    //res.sendFile(__dirname + '//' + 'index.html');
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

