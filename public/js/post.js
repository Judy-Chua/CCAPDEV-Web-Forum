$(document).ready(function() {    
    $(".upvote").click(function() {
        var numId = $(this).siblings('.vote-number');
        var down = $(this).siblings('.downvote');
        changeVote(1, this, numId, down);
    });

    $(".downvote").click(function() {
        var numId = $(this).siblings('.vote-number');
        var up = $(this).siblings('.upvote');
        changeVote(0, up, numId, this);
    });

    function changeVote(val, upvote, voteNumId, downvote) {
        var num = parseInt(voteNumId.text());
        if (num == null)
            num = 0;

        console.log(num);
        
        var up = "url('../images/up.png')";
        var down = "url('../images/down.png')";
        var colorUp = "url('../images/color-up.png')";
        var colorDown = "url('../images/color-down.png')";

        var currentUp = $(upvote).css("background-image"); //get css image
        var currUpvote = "url(\'../" + currentUp.substring(currentUp.indexOf("images/")); //get the only from images/...
        var currUp = currUpvote.replace("\"", "'"); //change " to '

        var currentDown = $(downvote).css("background-image");
        var currDownvote = "url(\'../" + currentDown.substring(currentDown.indexOf("images/"));
        var currDown = currDownvote.replace("\"", "'");
        
        if (val == 1) {
            //since it is hover in upvote, opposite effect (colorUp means not yet upvoted)
            $(downvote).css("background-image", down); //stay with no color
            if (currDown === colorDown && currUp === colorUp) { //initial vote is downvote changing to upvote
                //downvote is with color and the hovered upvote is with color
                num = num + 2; //plus two since +1 for upvote and +1 from starting in downvote
                $(upvote).css("background-image", up);
            } else if (currUp === up) { //user changed its mind, wanting to not vote anymore
                $(upvote).css("background-image", colorUp);
                num = num - 1; //remove the upvote
            } else if (currUp === colorUp && currDown === down) { //no initial vote
                    //hover is with color and the downvote is not clicked
                num = num + 1;
                $(upvote).css("background-image", up);
            }
        } else {
            $(upvote).css("background-image", up); // stay with no color
            if (currDown === colorDown && currUp === colorUp) { //initial vote is upvote changing to downvote
                //hovered downvote is with color and the upvote is with color
                num = num - 2;
                $(downvote).css("background-image", down);
            } else if (currDown === down) { //user changed its mind, wanting to not vote anymore
                num = num + 1; //remove the upvote
                $(downvote).css("background-image", colorDown);
            } else if (currDown === colorDown && currUp === up) { //no initial vote
                    //hover is with color and the downvote is not clicked
                num = num - 1;
                $(downvote).css("background-image", down);
            }
        }
    
        if (num < 0) {
            voteNumId.css('backgroundColor', '#f1f2f6');
            voteNumId.css('color', 'black');
        }
        else {
            voteNumId.css('backgroundColor', '#0e3768');
            voteNumId.css('color', '#f1f2f6');
        }
    
        voteNumId.text(num);
    }

    $(".upvote").hover(function() { //jquery hover funtion
        var noColor = "url('../images/up.png')";
        var current = $(this).css("background-image"); // "this" refers to the image being hovered despite class
        var currImg = "url(\'../" + current.substring(current.indexOf("images/")); //current returns the whole url (from users/etc)
        var currImage = currImg.replace("\"", "'"); //change the last " to '
        $(this).css("background-image", currImage === noColor ? "url('../images/color-up.png')" : noColor);
    });

    $(".downvote").hover(function() { //jquery hover funtion
        var noColor = "url('../images/down.png')";
        var current = $(this).css("background-image");
        var currImg = "url(\'../" + current.substring(current.indexOf("images/"));
        var currImage = currImg.replace("\"", "'");
        $(this).css("background-image", currImage === noColor ? "url('../images/color-down.png')" : noColor);  
    });

    $(".comment-submit").click(function(){
        var getFileNum = $(this).attr("id"); //get id of the div
        var fileNum = getFileNum.substring("comment-submit".length);
        submitComment(fileNum);
    });


    function submitComment(fileNum) {
        var comment = document.getElementById('comment-area'+fileNum).value;
        var add_comment = document.getElementById('comment'+fileNum);
        var div_comment = document.createElement('div');
        var date = new Date();
        var username = "Username";
    
        if (!comment) //no comment, post nothing
            return;
    
        div_comment.className = 'new-comment';
        var new_comment_id  = "comment" + numComment+fileNum;
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
                "<li><div class = 'comment-delete' id = 'del" + new_comment_id + "'></div></li>" +
                "<li><div class = 'comment-report'></div></li>" +
            "</ul>" +
            "</div>" +
        "</div>";
    
        add_comment.appendChild(div_comment); //add this comment container to the whole comment container
        numComment = numComment + 1;
    
        var checkDiv = document.getElementById('no-comment'+fileNum) != null;
        if (checkDiv)
            add_comment.removeChild(document.getElementById('no-comment'+fileNum));
        
        document.getElementById('comment-area'+fileNum).value = "";
        setTextResponse("Comment posted!", fileNum);
    }

    $(".comment-delete").click(function(){
        var getFileNum = $(this).attr("id"); //get id of the div
        var comment_id = getFileNum.substring("del".length);
        deleteComment(comment_id);
    });
    
    function deleteComment(comment_id) {
        var find_new_comment_container = document.getElementById(comment_id); //find the main container of this comment
        find_new_comment_container.parentNode.removeChild(find_new_comment_container); //remove this container through its parent
    
        var fileNum = comment_id.charAt(comment_id.length-1);
        setTextResponse("Comment deleted!", fileNum);
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
    
        var fileNum = comment_id.charAt(comment_id.length-1);
        setTextResponse("Comment edited!", fileNum);
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
    
    function setTextResponse(response, fileNum) { //animate the fade of action done
        var text_response = document.getElementById('text-response'+fileNum);
    
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
});
