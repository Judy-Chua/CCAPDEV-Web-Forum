$(document).ready(function() {  
    $("#image-of-post").click(function() {
        $("#file-image").click();
    });

    $("#file-image").change(function() {
        var img_files = $('#file-image')[0].files;
        if (img_files.length > 0) {
            var name  = img_files[0].name;
            $('#image-message').text('File uploaded: ' + name);
            $('#hidden-img-tag').val(name);
        } else {
            $('#image-message').text('File error');
        }
    });

    $('.edit-cancel').click(function() {
        revertValues();
        console.log("click cancel");
        location.href = "/mainpage/Adri20"; //original website
        console.log("click cancel2");
    });

    $(".publish-post").click(function() {
        var postTitle = $("#title-of-post").val();
        var postDesc = $("#desc-of-post").val();
        var postTag = $("#tag-of-post").val();

        var checkTitle = checkEmpty(postTitle, "#title-of-post");
        var checkDesc = checkEmpty(postDesc, "#desc-of-post");
        var checkTag = checkEmpty(postTag, "#tag-of-post");

        if (checkTitle && checkDesc && checkTag) {
            /*
            var currUser = "{{loggeduser.username}}"; //access handlebar
            User.findOne({username: currUser}, (error, user) => {
                if (error) {
                    console.log("Error finding this user: " + user);
                    return;
                }
                if (user) {
                    var loggedUser = user.userId;
                    addNewPost(loggedUser, postTitle, postDesc, postTag);
                } else {
                    console.log("User not found");
                }
            }); */

            location.href = "/mainpage/Adri20"; //go back to original website
            revertValues();
        }
    });

    /*
    function addNewPost(loggedUser, postTitle, postDesc, postTag) {
        var postDate = formatDate(new Date());

        var latestId = 0;
        var newPostId = 0;
            //all documents, postId only, in descending order, check for errors
        Post.find({}, 'postId', { sort: {'postId':-1}}, function(error, postArr) {
            if (error) {
                console.log(error);
            } else {
                if(postArr.length > 0) {
                    latestId = postArr[0].postId; //it is in descending order
                } else {
                    latestId = 19999;
                }
        
                newPostId = latestId + 1;
                
                var filename = $('#hidden-img-tag').val();
                var filePath;
                if (!filename) {
                    filePath = null;
                } else {
                    filePath  = '/images/' + filename;
                }
        
                const new_post = new Post({
                    postId: newPostId,
                    postUser: loggedUser,
                    title: postTitle,
                    description: postDesc,
                    comments:[],
                    image: filePath, // '/images/tftnotes.png'
                    tag: postTag,
                    upvotes: [],
                    downvotes: [],
                    popVal: 0,
                    trendVal: 0,
                    controVal: 0,
                    date: postDate,
                });
        
                new_post.save(function(error_post, result) {
                    if (error_post) {
                        console.log(error_post);
                    } else {
                        console.log(result);
                    }
                });
        
                setTimeout(function() { //delay of 1 second
                    location.href = "index.html"; //go back to original website
                }, 1000);
        
                revertValues();
            }
        });
    }
    */
        
    function checkEmpty(value, id) {
        if (!value) { //check if title is empty or not
            $(id).css('background-color', 'red');
            $(id).css('color', 'white');
            return false;
        } else { //reset in case it is originally empty
            $(id).css('background-color', 'white');
            $(id).css('color', 'black');
        }
        return true;
    }

    function revertValues() {
        $("#title-of-post").val('');
        $("#desc-of-post").val('');
        $("#tag-of-post").val('');

        $("#title-of-post").css('background-color', 'white');
        $("#title-of-post").css('color', 'black');
        $("#desc-of-post").css('background-color', 'white');
        $("#desc-of-post").css('color', 'black');
        $("#tag-of-post").css('background-color', 'white');
        $("#tag-of-post").css('color', 'black');

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
