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
// for not logged in
User.create({
    userId: 10004,
    username: '0',
    name: '',
    password: '',
    profilePicture:'/images/user-icon.png',    
    description:'',
    upvotes: [],
    downvotes: [],
    dateCreated: date
 });

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
    votes: 1,
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
    votes: 1,
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
    votes: 1,
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
    // res.sendFile(__dirname + '\\' + 'index.html');

    // command for macos
    res.sendFile(__dirname + '//' + 'index.html');
});

app.get('/signup-page/:username', async(req, res) => {
    const uname = req.params.username;
    const loggeduser = await User.findOne({ username : uname}); // dummy's userId
    res.render('signup-page', {loggeduser});
});

app.get('/login-page/:username', async(req, res) => {
    const uname = req.params.username;
    const loggeduser = await User.findOne({ username : uname}); // dummy's userId
    console.log(loggeduser);

    res.render('login-page', {loggeduser});
});

app.get('/mainpage/:username', async(req, res) => {
    const uname = req.params.username;
    const loggeduser = await User.findOne({username: uname});
    console.log(loggeduser.username);

    const allPosts = await Post.find({});
    console.log(allPosts);

    res.render('mainpage',{allPosts, loggeduser});

    /*
    function updateVoteCount(postId){
        const changeVotePost = await Post.findOne({postId: postId});
        var newVote = changeVotePost.votes;
    }
    
    function changeVote(val, postId, userId){
    
        const specificPost = await Post.find({postId: postId});

        if (val && !specificPost.upvotes.includes(userId)){ // if upvoted

            const onePost = await Post.update({postId : postId}, {$push: {upvotes: {userId}}});
            
            if(specificPost.downvotes.includes(userId))
            {
                onePost = await Post.update({postId : postId}, {$pull: {downvotes: {userId}}});
                

            }
        }
        else{ // if downvoted

            const onePost = await Post.update({postId : postId}, {$push: {downvotes: {userId}}}); 
            
            if(specificPost.upvotes.includes(userId))
            {
                onePost = await Post.update({postId : postId}, {$pull: {upvotes: {userId}}});
            }
        }
    }
    */
});

app.get('/mainpage/Clarisse35', async(req, res) => {
    const loggeduser = await User.findOne({username: 'Clarisse35'});
    console.log(loggeduser.username);

    const allPosts = await Post.find({})
    console.log(allPosts);

    res.render('mainpage',{allPosts, loggeduser})
});

app.get('/mainpage/Judy89', async(req, res) => {
    const allPosts = await Post.find({})
    console.log(allPosts);

    const loggeduser = await User.findOne({username: 'Judy89'});
    console.log(loggeduser);

    res.render('mainpage',{allPosts, loggeduser})
});


// User Profile Routes

// posts
app.get('/user-profile/0-posts', async(req, res) => {
    const user_posts = await Post.find({postUser : "10004"}); // dummy's userId
    console.log(user_posts);

    const loggeduser = await User.findOne({ username : "0"});
    console.log(loggeduser);

    res.render('user-profile',{user_posts, loggeduser})
});

app.get('/user-profile/Adri20-posts', async(req, res) => {
    const user_posts = await Post.find({postUser : "10000"}); // Adri20's userId
    console.log(user_posts);

    const loggeduser = await User.findOne({ username : "Adri20"});
    console.log(loggeduser);

    res.render('user-profile',{user_posts, loggeduser})
});

app.get('/user-profile/Clarisse35-posts', async(req, res) => {
    const user_posts = await Post.find({postUser : "10001"}); // Clarisse35's userId
    console.log(user_posts);

    const loggeduser = await User.findOne({ username : "Clarisse35"});
    console.log(loggeduser);

    res.render('user-profile',{user_posts, loggeduser})
});

app.get('/user-profile/Judy89-posts', async(req, res) => {
    const user_posts = await Post.find({postUser : "10002"}); // Judy89's userId
    console.log(user_posts);

    const loggeduser = await User.findOne({ username : "Judy89"});
    console.log(loggeduser);

    res.render('user-profile',{user_posts, loggeduser})
});


var server = app.listen(3000, function () {
    console.log('Node server is running..');
});

