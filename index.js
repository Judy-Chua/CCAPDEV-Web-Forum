const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/archerGuildDB')

const express = require('express')
const app = new express()
module.exports = mongoose;

const Post = require("./database/models/Post")
const Comment = require("./database/models/Comment")
const User = require("./database/models/User")
const path = require('path') 

//for file upload
const fs = require('fs'); //file system for uploading images
const multer = require('multer'); //for file upload
const upload = multer({ dest: './public/images/'}); //upload to this destination

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json()) // use json

var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

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
    console.log(loggeduser.userId);

    const allPosts = await Post.find({});
    console.log(allPosts);
    res.render('mainpage',{allPosts, loggeduser});
});

app.get('/popularResults/:username', async(req, res) => {
    const uname = req.params.username;
    const setting = 1;
    const loggeduser = await User.findOne({username: uname});
    const allPosts = await Post.find({}).sort({popVal:-1});
    console.log(allPosts);
    res.render('mainpage',{allPosts, loggeduser});
});

app.get('/trendingResults/:username', async(req, res) => {
    const uname = req.params.username;
    const setting = 1;
    const loggeduser = await User.findOne({username: uname});
    const allPosts = await Post.find({}).sort({trendVal:-1});
    console.log(allPosts);
    res.render('mainpage',{allPosts, loggeduser});
});

app.get('/controversialResults/:username', async(req, res) => {
    const uname = req.params.username;
    const setting = 1;
    const loggeduser = await User.findOne({username: uname});
    const allPosts = await Post.find({}).sort({controVal: -1});
    console.log(allPosts);
    res.render('mainpage',{allPosts, loggeduser});
});

app.get('/upVote/:post/vote/:username', async(req, res) => {
    const uname = req.params.username;
    const post = parseInt(req.params.post);
    console.log(post);

    const specificPost = await Post.findOne({postId: post});
    const loggeduser = await User.findOne({username: uname});

    const userId = loggeduser.userId;
    const postId = specificPost.postId;

    var voteCount = specificPost.votes;

    if (!specificPost.upvotes.includes(userId)){ // if not yet upvoted

        const onePost = await Post.updateOne({postId : postId}, {$push: {upvotes: userId}});
        var onePostAgain = await Post.updateOne(
            { postId: postId }, 
            { 
              $inc: { votes: 1 } 
            }
        );

        if(specificPost.downvotes.includes(userId))
        {
            onePostAgain = await Post.updateOne(
                { postId: postId }, 
                { 
                  $pull: { downvotes: userId }, 
                }
            );
        }
    }
});

app.get('/countVote/:post', async(req, res) => {

    const post = parseInt(req.params.post);
    const result = await Post.findOne({postId: post});
    res.send(''+ result.votes);
});

app.get('/downVote/:post/vote/:username', async(req, res) => {
    const uname = req.params.username;
    const post = parseInt(req.params.post);

    const specificPost = await Post.findOne({postId: post});
    const loggeduser = await User.findOne({username: uname});

    const userId = loggeduser.userId;
    const postId = specificPost.postId;

    if (!specificPost.downvotes.includes(userId)){ // if not yet downvoted

        const onePost = await Post.updateOne({postId : postId}, {$push: {downvotes: userId}});
        var onePostAgain = await Post.updateOne(
            { postId: postId }, 
            { 
              $inc: { votes: -1 } 
            }
        );

        if(specificPost.upvotes.includes(userId))
        {
            onePostAgain = await Post.updateOne(
                { postId: postId }, 
                { 
                  $pull: { upvotes: userId },  
                }
              );
        }
    }
});

app.get('/user-settings/:username', async(req, res) => {
    const uname = req.params.username;

    const loggeduser = await User.findOne({username: uname});

    res.render('user-settings',{loggeduser});
});

app.get('/searchresults/:username', async(req, res) => {

    const uname = req.params.username;
    const searchQuery = req.query.searchquery;
    const loggeduser = await User.findOne({username: uname});

    const searchedPosts = await Post.find(
        {$or: [
            {"title":new RegExp(searchQuery, "i")},
            {"description":new RegExp(searchQuery, "i")}
        ]
    });
    console.log('SEARCH QUERY' + searchQuery)
    console.log('POSTS', searchedPosts)
    res.render('searchresult',{loggeduser, searchedPosts, searchQuery});
});

app.get('/tagMoba/:username', async(req, res) => {

    const uname = req.params.username;
    const loggeduser = await User.findOne({username: uname});
    const searchQuery = 'MOBA'
    const searchedPosts = await Post.find(
       {tag: searchQuery},
    );
    res.render('searchresult',{loggeduser, searchedPosts, searchQuery});
});

app.get('/tagFPS/:username', async(req, res) => {

    const uname = req.params.username;
    const loggeduser = await User.findOne({username: uname});
    const searchQuery = 'FPS'
    const searchedPosts = await Post.find(
       {tag: searchQuery},
    );
    res.render('searchresult',{loggeduser, searchedPosts, searchQuery});
});

app.get('/tagSinglePlayer/:username', async(req, res) => {

    const uname = req.params.username;
    const loggeduser = await User.findOne({username: uname});
    const searchQuery = 'Singleplayer'
    const searchedPosts = await Post.find(
       {tag: searchQuery},
    );
    res.render('searchresult',{loggeduser, searchedPosts, searchQuery});
});

app.get('/tagMultiPlayer/:username', async(req, res) => {

    const uname = req.params.username;
    const loggeduser = await User.findOne({username: uname});
    const searchQuery = 'Multiplayer'
    const searchedPosts = await Post.find(
       {tag: searchQuery},
    );
    res.render('searchresult',{loggeduser, searchedPosts, searchQuery});
});
/*
    const uname = req.params.username;
    const loggeduser = await User.findOne({username: uname});

    const allPosts = await Post.find().sort({popVal:-1});
    console.log(allPosts);

    res.render('mainpage',{allPosts, loggeduser});
    */
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
    




// User Profile Routes

app.get('/user-profile/:username/posts', async(req, res) => {
    const uname = req.params.username;
    const user = await User.findOne({username : uname})
    const user_posts = await Post.find({postUser : user.userId}); // Adri20's userId
    console.log(user_posts);

    res.render('user-profile',{user_posts, user})
});



/*
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

// comments
app.get('/user-profile/Adri20-comments', async(req, res) => {
    const userIdtofind = 10000;
    const user_comms = await Comment.find({userId : userIdtofind}); // Adri20's userId
    console.log(user_comms.theComment);

    const user_posts = await Post.find({comments: userIdtofind});
    console.log(user_posts);

    const loggeduser = await User.findOne({ userId : userIdtofind});
    console.log(loggeduser);

    res.render('user-profile',{user_posts, loggeduser})
});

app.get('/user-profile/Clarisse35-comments', async(req, res) => {
    const userIdtofind = 10001;
    const user_comms = await Comment.find({userId : userIdtofind}); // Adri20's userId
    console.log(user_comms.theComment);

    const user_posts = await Post.find({comments: userIdtofind});
    console.log(user_posts);

    const loggeduser = await User.findOne({ userId : userIdtofind});
    console.log(loggeduser);

    res.render('user-profile',{user_posts, loggeduser})
});

app.get('/user-profile/Judy89-comments', async(req, res) => {
    const userIdtofind = 10002;
    const user_comms = await Comment.find({userId : userIdtofind}); // Adri20's userId
    console.log(user_comms.theComment);

    const user_posts = await Post.find({comments: userIdtofind});
    console.log(user_posts);

    const loggeduser = await User.findOne({ userId : userIdtofind});
    console.log(loggeduser);

    res.render('user-profile',{user_posts, loggeduser})
});


// upvotes

app.get('/user-profile/Adri20-upvotes', async(req, res) => {
    const userIdtofind = 10000;
    // TODO: add in upvotes from comments to user_posts

    //const user_comms = await Comment.find({ upvotes: userIdtofind });
    // console.log(user_comms.theComment);

    const user_posts = await Post.find({ upvotes: userIdtofind});
    console.log(user_posts);

    const loggeduser = await User.findOne({ userId : userIdtofind});
    // console.log(loggeduser);

    res.render('user-profile',{user_posts, loggeduser})
});


app.get('/user-profile/Clarisse35-upvotes', async(req, res) => {
    const userIdtofind = 10001;
    // TODO: add in upvotes from comments to user_posts

    //const user_comms = await Comment.find({ upvotes: userIdtofind });
    // console.log(user_comms.theComment);

    const user_posts = await Post.find({ upvotes: userIdtofind});
    console.log(user_posts);

    const loggeduser = await User.findOne({ userId : userIdtofind});
    // console.log(loggeduser);

    res.render('user-profile',{user_posts, loggeduser})
});

app.get('/user-profile/Judy89-upvotes', async(req, res) => {
    const userIdtofind = 10002;
    // TODO: add in upvotes from comments to user_posts

    //const user_comms = await Comment.find({ upvotes: userIdtofind });
    // console.log(user_comms.theComment);

    const user_posts = await Post.find({ upvotes: userIdtofind});
    console.log(user_posts);

    const loggeduser = await User.findOne({ userId : userIdtofind});
    // console.log(loggeduser);

    res.render('user-profile',{user_posts, loggeduser})
});


// downvotes

app.get('/user-profile/Adri20-downvotes', async(req, res) => {
    const userIdtofind = 10000;
    // TODO: add in upvotes from comments to user_posts

    //const user_comms = await Comment.find({ upvotes: userIdtofind });
    // console.log(user_comms.theComment);

    const user_posts = await Post.find({ downvotes: userIdtofind});
    console.log(user_posts);

    const loggeduser = await User.findOne({ userId : userIdtofind});
    // console.log(loggeduser);

    res.render('user-profile',{user_posts, loggeduser})
});


app.get('/user-profile/Clarisse35-downvotes', async(req, res) => {
    const userIdtofind = 10001;
    // TODO: add in upvotes from comments to user_posts

    //const user_comms = await Comment.find({ upvotes: userIdtofind });
    // console.log(user_comms.theComment);

    const user_posts = await Post.find({ downvotes: userIdtofind});
    console.log(user_posts);

    const loggeduser = await User.findOne({ userId : userIdtofind});
    // console.log(loggeduser);

    res.render('user-profile',{user_posts, loggeduser})
});

app.get('/user-profile/Judy89-downvotes', async(req, res) => {
    const userIdtofind = 10002;
    // TODO: add in upvotes from comments to user_posts

    //const user_comms = await Comment.find({ upvotes: userIdtofind });
    // console.log(user_comms.theComment);

    const user_posts = await Post.find({ downvotes: userIdtofind});
    console.log(user_posts);

    const loggeduser = await User.findOne({ userId : userIdtofind});
    // console.log(loggeduser);

    res.render('user-profile',{user_posts, loggeduser})
});

//for post image uploading in edit.hbs (not yet tested)
app.post('/uploadPostImage', upload.single('file-image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.'); //404 means file not found
    }

    var filePath = req.file.path; //filepath of the image
    var transferPath = './public/images/' + req.file.originalname; //filepath for the images folder

    //read the file first to upload it to images (local) folder
    fs.readFile(filePath, (errorFile, data) => {
        if (errorFile) {
            return res.status(500).send("Error reading file: " + errorFile); //500 means internal error
        }

        fs.writeFile(transferPath, data, (error_writing) => {
            if (error_writing) {
                return res.status(500).send("Error writing file: " + error_writing);
            } else {
                return res.status(200).send("File uploaded successfully");
            }
        });
    });
});

//helper function for post.hbs
hbs.registerHelper('getUserProfPic', async function(userId) {
    const comment_user = await User.findOne({userId: userId});
    if (comment_user) {
        return comment_user.profilePicture;
    } else {
        return null;
    }
});

//helper function for post.hbs
hbs.registerHelper('getUsername', async function(userId) {
    const comment_user = await User.findOne({userId: userId});
    if (comment_user) {
        return comment_user.username;
    } else {
        return null;
    }
});

app.get('/post/:title', async(req, res) => {
    const post_title = req.params.title;
    const specific_post = await Post.findOne({title: post_title});
    const loggeduser = await User.findOne({ username: 'Adri20'}); //change to isLogged: '1'
    const allComments = await Comment.find({});
    
    var postComments = [];
    if (specific_post) {
        for (var i = 0; i < allComments.length; i++) {
            if (specific_post.comments.includes(allComments[i].commentId)) {
                postComments.push(allComments[i]);
            }
        }
    }
    const post_user = await User.findOne({userId: specific_post.postUser});

    var post_info;
    if (specific_post) {
        const votes = specific_post.upvotes.length - specific_post.downvotes.length;
        post_info = {
            title: specific_post.title,
            username: post_user.username,
            description: specific_post.description,
            image: specific_post.image,
            getVotes: votes,
            allTags: specific_post.tag,
            allComments: postComments
        }
    } else {
        post_info = null;
    }
    res.render('post', { loggeduser, post_info})
});
*/


var server = app.listen(3000, function () {
    console.log('Node server is running..');
});

