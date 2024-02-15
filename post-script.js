var voteCount = 0;
var voteCommentCount = 0;
var numComment = 0;

function changeVote(val) {
    var upElem = document.getElementById("upvote");
    var downElem = document.getElementById("downvote");
    var num = parseInt(document.getElementById("vote-number").textContent);
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
        document.getElementById("vote-number").style.backgroundColor = '#f1f2f6';
        document.getElementById("vote-number").style.color = 'black';
    }
    else {
        document.getElementById("vote-number").style.backgroundColor = '#0e3768';
        document.getElementById("vote-number").style.color = '#f1f2f6';
    }

    document.getElementById("vote-number").innerHTML = num;
}

function submitComment() {
    var comment = document.getElementById('comment-area').value;
    var add_comment = document.getElementById('comment');
    var div_comment = document.createElement('div');
    var date = new Date();
    var username = "Username";

    if (!comment)
        return;

    div_comment.className = 'new-comment';
    var new_comment_id  = "comment" + numComment;
    div_comment.setAttribute('id', new_comment_id);
    div_comment.innerHTML = 
    "<div class = 'picture-person'> </div>" +
    "<div class = 'comment-person'>" + 
        "<div class = 'username-comment'>" +
            "<div class = 'username-person'>" + username + "</div>" +
            "<div class = 'username-dash'>|</div>" +
            "<div class = 'username-date'>" + date.toLocaleDateString() + " " + date.toLocaleTimeString() + "</div>" +
        "</div>" +
        
        "<div class = 'content-comment'>" +
            "<div class = 'comment-comment' id='cc" + new_comment_id + "'>" + comment + "</div>" +
        "</div>" +
        "<div class = 'actions-comment-container'>" +
        "<ul class = 'actions-comment'>" +
            "<li><div class = 'comment-upvote' id='upvo-"+new_comment_id+"' onclick='voteComment(\""+new_comment_id+"\", 1)'></div></li>" +
            "<li><div class = 'comment-votenum' id='numb-"+new_comment_id+"'>0</div></li>" +
            "<li><div class = 'comment-downvote' id='down-"+new_comment_id+"' onclick='voteComment(\""+new_comment_id+"\", 0)'></div></li>" +
            "<li><div class = 'comment-reply'>Reply</div></li>" +
        "</ul>" +
        "<ul class = 'actions-comment'>" +
            "<li><div class = 'comment-edit-date' id='date" + new_comment_id + "'></div>" +
            "<li><div class = 'comment-submit-edit' id='s" + new_comment_id + "' onclick='publishComment(\"" + new_comment_id + "\")'></div>" +
            "<li><div class = 'comment-edit' id = 'e" + new_comment_id + "' onclick='editComment(\"" 
                    + new_comment_id + "\")'></div></li>" +
            "<li><div class = 'comment-delete' id = 'n" + new_comment_id + "' onclick='deleteComment(\"" + new_comment_id + "\")'></div></li>" +
            "<li><div class = 'comment-report'></div></li>" +
        "</ul>" +
        "</div>" +
    "</div>";

    add_comment.appendChild(div_comment);
    numComment = numComment + 1;

    var checkDiv = document.getElementById('no-comment') != null;
    if (checkDiv)
        add_comment.removeChild(document.getElementById('no-comment'));
    
    document.getElementById('comment-area').value = "";
    setTextResponse("Comment posted!");
}

function deleteComment(comment_id) {
    var find_new_comment_container = document.getElementById(comment_id);
    find_new_comment_container.parentNode.removeChild(find_new_comment_container);
    setTextResponse("Comment deleted!");
}

function editComment(comment_id) {
    var comment_content = document.getElementById("cc" + comment_id);
    var comment_edit = document.getElementById("ce" + comment_id);

    if (!comment_edit) {
        comment_edit = document.createElement('textarea');
        comment_edit.setAttribute("id", "ce"+comment_id);
        comment_edit.value = comment_content.innerHTML;
        comment_content.parentNode.appendChild(comment_edit);
    }

    comment_content.style.display = "none";
    comment_edit.style.display = "block";

    document.getElementById("s" + comment_id).style.display = "block";
    document.getElementById("e" + comment_id).style.display = "none";
}

function publishComment(comment_id) {
    var comment_edit = document.getElementById("ce" + comment_id);
    var comment_content = document.getElementById('cc' + comment_id);
    comment_content.innerHTML = comment_edit.value;

    comment_content.style.display = "block";
    comment_edit.style.display = "none";

    var date = new Date();

    document.getElementById("date" + comment_id).innerHTML = "last edited last " + 
                    date.toLocaleDateString() + " " + date.toLocaleTimeString();

    document.getElementById("s" + comment_id).style.display = "none";
    document.getElementById("e" + comment_id).style.display = "block";
    document.getElementById("date" + comment_id).style.display = "block";
    setTextResponse("Comment edited!");
}

function voteComment(comment_id, val) {
    var upElem = document.getElementById("upvo-"+comment_id);
    var downElem = document.getElementById("down-"+comment_id);

    var upElemStyle = window.getComputedStyle(upElem);
    var upElemBG = upElemStyle.getPropertyValue('background-image');
    var upElemImage = "url(\"" + upElemBG.substring(upElemBG.indexOf("images/"));
    
    var downElemStyle = window.getComputedStyle(downElem);
    var downElemBG = downElemStyle.getPropertyValue('background-image');
    var downElemImage = "url(\"" + downElemBG.substring(downElemBG.indexOf("images/"));

    var num = parseInt(document.getElementById("numb-"+comment_id).textContent);
    if (num == null)
        num = 0;

    console.log(upElemImage);
    console.log(downElemImage);


    if (val == 1) {
        
        if (upElemImage == "url(\"images/reply-up.png\")" 
        && downElemImage == "url(\"images/reply-down.png\")") {
            num = num + 1;
            upElem.style.backgroundImage = "url(\"images/reply-color-up.png\")";
        }
        else if (upElemImage == "url(\"images/reply-color-up.png\")" 
        && downElemImage == "url(\"images/reply-down.png\")") {
            num = num - 1;
            upElem.style.backgroundImage = "url(\"images/reply-up.png\")";
        }
        else if (upElemImage == "url(\"images/reply-up.png\")" 
        && downElemImage == "url(\"images/reply-color-down.png\")") {
            num = num + 2;
            upElem.style.backgroundImage = "url(\"images/reply-color-up.png\")";
            downElem.style.backgroundImage = "url(\"images/reply-down.png\")";
        }
    } else {
        if (upElemImage == "url(\"images/reply-up.png\")" 
        && downElemImage == "url(\"images/reply-down.png\")") {
            num = num - 1;
            downElem.style.backgroundImage = "url(\"images/reply-color-down.png\")";
        }
        else if (upElemImage == "url(\"images/reply-up.png\")" 
        && downElemImage == "url(\"images/reply-color-down.png\")") {
            num = num + 1;
            downElem.style.backgroundImage = "url(\"images/reply-down.png\")";
        }
        else if (upElemImage == "url(\"images/reply-color-up.png\")" 
        && downElemImage == "url(\"images/reply-down.png\")") {
            num = num - 2;
            upElem.style.backgroundImage = "url(\"images/reply-up.png\")";
            downElem.style.backgroundImage = "url(\"images/reply-color-down.png\")";
        }
    }

    console.log(val, num);
    document.getElementById("numb-"+comment_id).innerHTML = num;
}

function setTextResponse(response) {
    var text_response = document.getElementById('text-response');

    text_response.innerHTML = response;
    text_response.style.opacity = '1';

    setTimeout(function() {
        text_response.style.opacity = '0.9';
    }, 3000);

    setTimeout(function() {
        text_response.style.opacity = '0.8';
    }, 3050);

    setTimeout(function() {
        text_response.style.opacity = '0.7';
    }, 3100);

    setTimeout(function() {
        text_response.style.opacity = '0.6';
    }, 3150);

    setTimeout(function() {
        text_response.style.opacity = '0.5';
    }, 3200);

    setTimeout(function() {
        text_response.style.opacity = '0.4';
    }, 3250);

    setTimeout(function() {
        text_response.style.opacity = '0.3';
    }, 3300);

    setTimeout(function() {
        text_response.style.opacity = '0.2';
    }, 3350);

    setTimeout(function() {
        text_response.style.opacity = '0.1';
    }, 3400);

    setTimeout(function() {
        text_response.style.opacity = '0';
    }, 3450);
   
}

function publishPost() {
    var title = document.getElementById('title-of-post').value;
    var desc = document.getElementById('desc-of-post').value;
    var tag = document.getElementById('tag-of-post').value;

    var required = 1;

    if (!title) {
        document.getElementById('title-of-post').style.backgroundColor = 'red';
        document.getElementById('title-of-post').style.color = 'white';
        required = 0;
    } else {
        document.getElementById('title-of-post').style.backgroundColor = 'white';
        document.getElementById('title-of-post').style.color = 'black';
    }
    if (!desc) {
        document.getElementById('desc-of-post').style.backgroundColor = 'red';
        document.getElementById('desc-of-post').style.color = 'white';
        required = 0;
    } else {
        document.getElementById('desc-of-post').style.backgroundColor = 'white';
        document.getElementById('desc-of-post').style.color = 'black';
    } 
    if (tag == "add") {
        document.getElementById('tag-of-post').style.backgroundColor = 'red';
        document.getElementById('tag-of-post').style.color = 'white';
        required = 0;
    } else {
        document.getElementById('tag-of-post').style.backgroundColor = '#b0d8e3';
        document.getElementById('tag-of-post').style.color = 'black';
    }

    if(required == 1) {
        setTimeout(function() {
            location.href = "index.html";
        }, 1000);
    }
    
}

function cancelPost() {
    document.getElementById('title-of-post').value = "";
    document.getElementById('desc-of-post').value = "";
    document.getElementById('tag-of-post').value = "add";

    document.getElementById('desc-of-post').style.backgroundColor = 'white';
    document.getElementById('desc-of-post').style.color = 'black';
    document.getElementById('tag-of-post').style.backgroundColor = '#b0d8e3';
    document.getElementById('tag-of-post').style.color = 'black';
    document.getElementById('title-of-post').style.backgroundColor = 'white';
        document.getElementById('title-of-post').style.color = 'black';

    setTimeout(function() {
        location.href = "index.html";
    }, 1000);
    
}
