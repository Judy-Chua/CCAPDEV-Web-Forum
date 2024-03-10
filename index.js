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

app.get('/', function (req, res) {
    res.sendFile(__dirname + '\\' + 'index.html');
});

app.get('/login-page.html', function(req, res){
    res.sendFile(__dirname + '\\' + 'login-page.html');
});

app.get('/signup-page.html', function(req, res){
    res.sendFile(__dirname + '\\' + 'signup-page.html');
});

var server = app.listen(3000, function () {
    console.log('Node server is running..');
});

