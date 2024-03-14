var voteCount = 0;
var voteCount2 = 0;
var voteCount3 = 0;

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/archerGuildDB')

const Post = require("./database/models/Post")
const express = require('express')
const app = new express()
module.exports = mongoose;

app.use(express.static('public')) // we'll add a static directory named "public"

var hbs = require('hbs')
app.set('view engine','hbs');



function changeVote(val, fileNum) {
    var upElem = document.getElementById("upvote"+fileNum);
    var downElem = document.getElementById("downvote"+fileNum);
    var num = parseInt(document.getElementById("vote-number"+fileNum).textContent);
    if (num == null)
        num = 0;

    if (val == 1) {
        upElem.style.backgroundImage = "url('images/color-up.png')";
        downElem.style.backgroundImage = "url('images/down.png')";
        
        if (voteCount == -1) {
            num = num + 2;
            voteCount = 1;
        }
            
        else if (voteCount == 1) {
            upElem.style.backgroundImage = "url('images/up.png')";
            num = num - 1;
            voteCount = 0;
        }
        else {
            num = num + 1;
            voteCount = 1;
        }
    } else {
        upElem.style.backgroundImage = "url('images/up.png')";
        downElem.style.backgroundImage = "url('images/color-down.png')";

        if (voteCount == 1) {
            num = num - 2;
            voteCount = -1;
        }
        else if (voteCount == -1) {
            downElem.style.backgroundImage = "url('images/down.png')";
            num = num + 1;
            voteCount = 0;
        }
        else {
            num = num - 1;
            voteCount = -1;
        }
    }

    if (num < 0) {
        document.getElementById("vote-number"+fileNum).style.backgroundColor = '#f1f2f6';
        document.getElementById("vote-number"+fileNum).style.color = 'black';
    }
    else {
        document.getElementById("vote-number"+fileNum).style.backgroundColor = '#0e3768';
        document.getElementById("vote-number"+fileNum).style.color = '#f1f2f6';
    }

    document.getElementById("vote-number"+fileNum).innerHTML = num;
}

function changeVote2(val, fileNum) {
    var upElem = document.getElementById("upvote2"+fileNum);
    var downElem = document.getElementById("downvote2"+fileNum);
    var num = parseInt(document.getElementById("vote-number2"+fileNum).textContent);
    if (num == null)
        num = 0;

    if (val == 1) {
        upElem.style.backgroundImage = "url('images/color-up.png')";
        downElem.style.backgroundImage = "url('images/down.png')";
        
        if (voteCount2 == -1) {
            num = num + 2;
            voteCount2 = 1;
        }
            
        else if (voteCount2 == 1) {
            upElem.style.backgroundImage = "url('images/up.png')";
            num = num - 1;
            voteCount2 = 0;
        }
        else {
            num = num + 1;
            voteCount2 = 1;
        }
    } else {
        upElem.style.backgroundImage = "url('images/up.png')";
        downElem.style.backgroundImage = "url('images/color-down.png')";

        if (voteCount2 == 1) {
            num = num - 2;
            voteCount2 = -1;
        }
        else if (voteCount2 == -1) {
            downElem.style.backgroundImage = "url('images/down.png')";
            num = num + 1;
            voteCount2 = 0;
        }
        else {
            num = num - 1;
            voteCount2 = -1;
        }
    }

    if (num < 0) {
        document.getElementById("vote-number2"+fileNum).style.backgroundColor = '#f1f2f6';
        document.getElementById("vote-number2"+fileNum).style.color = 'black';
    }
    else {
        document.getElementById("vote-number2"+fileNum).style.backgroundColor = '#0e3768';
        document.getElementById("vote-number2"+fileNum).style.color = '#f1f2f6';2
    }

    document.getElementById("vote-number2"+fileNum).innerHTML = num;
}

function changeVote3(val, fileNum) {
    var upElem = document.getElementById("upvote3"+fileNum);
    var downElem = document.getElementById("downvote3"+fileNum);
    var num = parseInt(document.getElementById("vote-number3"+fileNum).textContent);
    if (num == null)
        num = 0;

    if (val == 1) {
        upElem.style.backgroundImage = "url('images/color-up.png')";
        downElem.style.backgroundImage = "url('images/down.png')";
        
        if (voteCount3 == -1) {
            num = num + 2;
            voteCount3 = 1;
        }
            
        else if (voteCount3 == 1) {
            upElem.style.backgroundImage = "url('images/up.png')";
            num = num - 1;
            voteCount3 = 0;
        }
        else {
            num = num + 1;
            voteCount3 = 1;
        }
    } else {
        upElem.style.backgroundImage = "url('images/up.png')";
        downElem.style.backgroundImage = "url('images/color-down.png')";

        if (voteCount3 == 1) {
            num = num - 2;
            voteCount3 = -1;
        }
        else if (voteCount3 == -1) {
            downElem.style.backgroundImage = "url('images/down.png')";
            num = num + 1;
            voteCount3 = 0;
        }
        else {
            num = num - 1;
            voteCount3 = -1;
        }
    }

    if (num < 0) {
        document.getElementById("vote-number3"+fileNum).style.backgroundColor = '#f1f2f6';
        document.getElementById("vote-number3"+fileNum).style.color = 'black';
    }
    else {
        document.getElementById("vote-number3"+fileNum).style.backgroundColor = '#0e3768';
        document.getElementById("vote-number3"+fileNum).style.color = '#f1f2f6';
    }

    document.getElementById("vote-number3"+fileNum).innerHTML = num;
}
function urlHandler(value) {                               
    window.location.assign(`${value}`);
}

