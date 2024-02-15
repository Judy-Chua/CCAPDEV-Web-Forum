document.addEventListener("DOMContentLoaded", function() {
    var loginBtn = document.getElementById("confirm-login-btn");
    var userIcon = document.querySelector(".user-icon");

    var storedIcon = localStorage.getItem("user_icon_src");
    // if already logged in
    if (storedIcon) {
        userIcon.src = storedIcon;
    }

    loginBtn.addEventListener("click", function() {
        // change user icon once logged in
        userIcon.src = "images/tftplayer100-user-icon.jpg";
        localStorage.setItem("user_icon_src", userIcon.src);
    });
});