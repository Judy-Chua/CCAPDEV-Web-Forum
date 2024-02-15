var isLoggedIn = false;
var curUserIcon = document.getElementById("cur-usericon");

document.addEventListener("DOMContentLoaded", function changeUserIcon() {

    if (isLoggedIn) {
        curUserIcon.src = "tftplayer100-user-icon.jpg";
    }
});

function updateLogStatus() {
    isLoggedIn = true;
}