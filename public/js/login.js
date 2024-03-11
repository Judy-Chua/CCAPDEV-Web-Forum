const mongoose = require('../index');

document.addEventListener("DOMContentLoaded", function() {
    var loginBtn = document.getElementById("confirm-login-btn");

    loginBtn.addEventListener("click", function() {

        // still not working
        User.updateOne( { userId: "002" },
        {
        $set: {
            isLoggedIn: "1"
        }
        })
    });
});

app.get('/mainpage', async(req, res) => {
    const allPosts = await Post.find({})
    console.log(allPosts);

    const loggeduser = await User.findOne({ isLoggedIn: "1"});
    console.log(loggeduser);

    res.render('mainpage',{allPosts, loggeduser})
});