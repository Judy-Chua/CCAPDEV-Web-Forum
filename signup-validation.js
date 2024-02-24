document.addEventListener("DOMContentLoaded", function() {
    var pw1 = document.getElementById("pwd1");
    var pw2 = document.getElementById("pwd2");
    var signupBtn = document.getElementById("confirm-signup-btn");

    signupBtn.addEventListener("click", function() {

        if (pw1.value === pw2.value) {
            window.location.href = "tftplayer100-mainpage.html";
        } else {
            pw1.style.backgroundColor = "red";
            pw2.style.backgroundColor = "red";
        }
    });
});
