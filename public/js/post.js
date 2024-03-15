
$(document).ready(function() {  
    var coloredUp = false;
    var coloredDown = false;
    
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

        /*
        var currUser = "{{loggeduser.username}}"; //access handlebar
        var loggedUser = 0;
        User.findOne({username: currUser}, (error, user) => {
            if (error) {
                console.log("Error finding this user: " + error);
                return;
            }
            if (user) {
                loggedUser = user.userId;
            } else {
                console.log("User not found");
            }
        });

        */
        
        var up = "url('../images/up.png')";
        var down = "url('../images/down.png')";
        var colorUp = "url('../images/color-up.png')";
        var colorDown = "url('../images/color-down.png')";

        if (val == 1) {
            $(downvote).css("background-image", down); //stay with no color
            if (coloredDown && !coloredUp) { //initial vote is downvote changing to upvote
                num = num + 2; //plus two since +1 for upvote and +1 from starting in downvote
                //updateVotes(1, -1, loggedUser);
                $(upvote).css("background-image", colorUp);
                coloredUp = true;
                coloredDown = false;
            } else if (coloredUp) { //user changed its mind, wanting to not vote anymore
                num = num - 1; //remove the upvote
                $(upvote).css("background-image", up);
                //updateVotes(-1, 0, loggedUser);
                coloredUp = false;
            } else if (!coloredUp && !coloredDown) { //no initial vote
                num = num + 1;
                //updateVotes(1, 0, loggedUser);
                $(upvote).css("background-image", colorUp);
                coloredUp = true;
            }
        } else {
            $(upvote).css("background-image", up); // stay with no color
            if (!coloredDown && coloredUp) { //initial vote is upvote changing to downvote
                num = num - 2;
                //updateVotes(-1, 1, loggedUser);
                $(downvote).css("background-image", colorDown);
                coloredUp = false;
                coloredDown = true;
            } else if (coloredDown) { //user changed its mind, wanting to not vote anymore
                num = num + 1; //remove the downvote
                //updateVotes(0, -1, loggedUser);
                $(downvote).css("background-image", down);
                coloredDown = false;
            } else if (!coloredDown && !coloredUp) { //no initial vote
                num = num - 1;
                //updateVotes(0, 1, loggedUser);
                $(downvote).css("background-image", colorDown);
                coloredDown = true;
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

    /*
    function updateVotes(up, down, loggedUser) {
        if (!loggedUser || loggedUser == 0) {
            return;
        }

        var currPostTitle = "{{post_info.title}}";
        Post.findOne({title: currPostTitle}, (error, post) => {
            if (error) {
                console.log("Error finding this user: " + error);
                return;
            }
            if (post) {
                if (up == 1) { //add upvote 
                    post.upvotes.push(loggedUser);
                } else if (up == -1) { //remove upvote
                    post.upvotes.pull(loggedUser);
                }
                if (down == 1) { //add downvote
                    post.downvotes.push(loggedUser);
                } else if (down == -1) { //remove downvote
                    post.downvotes.pull(loggedUser);
                }
                    
                post.save(function(error_save, update) {
                    if (error_save) {
                        console.log("Error saving: " + error_save);
                    } else {
                        console.log("Successful update! " + update);
                    }
                });
            } else {
                console.log("Post not found");
            }
        });
    }
    */

    $(".upvote").mouseenter(function() { //jquery hover funtion
        if (!coloredUp)
            $(this).css("background-image", "url('../images/color-up.png')");
    });

    $(".upvote").mouseleave(function() { //jquery hover funtion
        if (!coloredUp) {
            $(this).css("background-image", "url('../images/up.png')"); 
        }
    });

    $(".downvote").mouseenter(function() { //jquery hover funtion
        if (!coloredDown)
            $(this).css("background-image", "url('../images/color-down.png')");
    });

    $(".downvote").mouseleave(function() { //jquery hover funtion
        if (!coloredDown) {
            $(this).css("background-image", "url('../images/down.png')"); 
        }
    });

    $(".comment-submit").click(function(){
        var commentTextArea = $(this).siblings('.comment-area');
        var comment = commentTextArea.val();
        var currUser = "{{loggeduser.username}}"; //access handlebar
        var commentDate = formatDate(new Date());

        console.log("Comment by " + currUser + "(" + commentDate + "): " + comment);
        /*
         
        User.findOne({username: currUser}, (error, user) => {
            if (error) {
                console.log("Error finding this user: " + user);
                return;
            }
            if (user) {
                var loggedUser = user.userId;

                var latestId = 0;
                var newCommentId = 0;
                Comment.find({}, 'commentId', { sort: {'commentId':-1}}, function(error, comArr) {
                    if (error) {
                        console.log(error);
                    } else {
                        if(comArr.length > 0) {
                            latestId = comArr[0].commentId; //it is in descending order
                        } else {
                            latestId = 29999;
                        }
                        newCommentId = latestId + 1;

                        const new_comment = new Comment({
                            commentId: newCommentId,
                            userId: loggedUser,
                            theComment: comment,
                            upvotes: [],
                            downvotes: [],
                            date: commentDate,
                            popVal: 0
                        });

                        new_comment.save(function(error_post, result) {
                            if (error_post) {
                                console.log(error_post);
                            } else {
                                console.log(result);
                            }
                        });
                    }

            } else {
                console.log("User not found");
            }
        */

        setTextResponse("Comment posted!");
    });

    $(".comment-delete").click(function() {
        //for now: go back to mainpage
        location.href = "/mainpage/Adri20";
        //delete the comment data from database
    });

    $(".comment-edit").click(function() {
        var content = $(".comment-comment");
        var edit = $(".comment-edit-area");
        if (!edit.length) {
            edit = $("<textarea></textarea>"); //create textarea
            edit.val(content.text());
            content.after(edit);
        }

        content.hide();
        edit.show();

        $(".comment-submit-edit").show();
        $(".comment-edit").hide();
    });

    $(".comment-submit-edit").click(function() {
        $(".comment-comment").html($(".comment-edit-area").val());
        $(".comment-comment").show();
        $(".comment-edit-area").edit();

        var date = new Date();

        $(".comment-edit-date").text("last edited last " + formatDate(date));
        $(".comment-submit-edit").hide();
        $(".comment-edit").show();
        $(".comment-edit-date").show();

        setTextResponse("Comment edited!");
    });
    
    function setTextResponse(response) { //animate the fade of action done
        $(".text-response").html(response);
        $(".text-response").css("opacity", 1);
    
        setTimeout(function() {
            $(".text-response").css("opacity", 0.9);
        }, 3000);
    
        setTimeout(function() {
            $(".text-response").css("opacity", 0.8);
        }, 3050);
    
        setTimeout(function() {
            $(".text-response").css("opacity", 0.7);
        }, 3100);
    
        setTimeout(function() {
            $(".text-response").css("opacity", 0.6);
        }, 3150);
    
        setTimeout(function() {
            $(".text-response").css("opacity", 0.5);
        }, 3200);
    
        setTimeout(function() {
            $(".text-response").css("opacity", 0.4);
        }, 3250);
    
        setTimeout(function() {
            $(".text-response").css("opacity", 0.3);
        }, 3300);
    
        setTimeout(function() {
            $(".text-response").css("opacity", 0.2);
        }, 3350);
    
        setTimeout(function() {
            $(".text-response").css("opacity", 0.1);
        }, 3400);
    
        setTimeout(function() {
            $(".text-response").css("opacity", 0);
        }, 3450);
       
    }

    function formatDate(date) {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var day = date.getDate().toString().padStart(2, '0');
        var hour = date.getHours().toString().padStart(2, '0');
        var min = date.getMinutes().toString().padStart(2, '0');

        return month + '/' + day + '/' + year + ' ' + hour + ':' + min;
    }
});
