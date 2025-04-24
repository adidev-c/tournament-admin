const start = document.getElementById("start");
const register = document.getElementById("register");
const admin = document.getElementById("admin");
const score = document.getElementById("score");

start.addEventListener("click",()=>{
    window.location.href = "start.html";
});

register.addEventListener("click",()=>{
    window.location.href = "register.html";
});

admin.addEventListener("click",()=>{
    window.location.href = "admin.html";
});

score.addEventListener("click",()=>{
    window.location.href = "https://crowlingspider.github.io/tournament-score";
});