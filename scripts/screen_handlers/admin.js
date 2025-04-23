import {
    get_data,
    set_data,
    push_data,
    a_name,
    b_name,
    a_score,
    b_score,
    live,
    past,
    status,
} from '../db/firebase.js';
import { onValue } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
const a_plus = document.getElementById("a-plus");
const a_minus = document.getElementById("a-minus");
const b_plus = document.getElementById("b-plus");
const b_minus = document.getElementById("b-minus");
const end_match = document.getElementById("endMatchButton")
const team_1_name = document.getElementById("team1-name");
const team_2_name = document.getElementById("team2-name");
const team_1_score = document.getElementById("team1-score");
const team_2_score = document.getElementById("team2-score");

function change_score1(snapshot) {
    team_1_score.innerText = snapshot.val();
}

function change_score2(snapshot) {
    team_2_score.innerText = snapshot.val();
}

function change_name1(snapshot) {
    team_1_name.innerText = snapshot.val();
}

function change_name2(snapshot) {
    team_2_name.innerText = snapshot.val();
}

async function read_names() {
    try {
        const team1 = await get_data(a_name);
        const team2 = await get_data(b_name);
        return [team1, team2];
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

async function read_scores() {
    try {
        const team1_score = await get_data(a_score);
        const team2_score = await get_data(b_score);
        return [team1_score, team2_score];
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

async function load_screen() {
    try {
        const [team1, team2] = await read_names();
        const [team1_score, team2_score] = await read_scores();
        set_team1(team1, team1_score);
        set_team2(team2, team2_score);
    } catch (error) {
        console.error("Error loading data:", error);
    }
}
function set_team1(name1, score1) {
    team_1_score.innerText = score1;
    team_1_name.innerText = name1;
}
function set_team2(name2, score2) {
    team_2_score.innerText = score2;
    team_2_name.innerText = name2;
}

document.addEventListener("DOMContentLoaded", () => {
    onValue(a_score, change_score1);
    onValue(b_score, change_score2);
    onValue(a_name, change_name1);
    onValue(b_name, change_name2);

});


//click functions
a_plus.addEventListener("click", () => {
    let new_score = parseInt(team_1_score.innerText) + 1;
    set_data(a_score, new_score);
});

a_minus.addEventListener("click", () => {
    let new_score = parseInt(team_1_score.innerText) - 1;
    set_data(a_score, new_score);
})

b_plus.addEventListener("click", () => {
    let new_score = parseInt(team_2_score.innerText) + 1;
    set_data(b_score, new_score);
})

b_minus.addEventListener("click", () => {
    let new_score = parseInt(team_2_score.innerText) - 1;
    set_data(b_score, new_score);
})

//end match
function add_status(match) {
    let scorea = parseInt(team_1_score.innerText);
    let scoreb = parseInt(team_2_score.innerText);
    let game_status = ''
    if (scorea > scoreb) {
        game_status = `${match.teama.name} Won`
    } else if (scoreb > scorea) {
        game_status = `${match.teamb.name} Won`
    } else {
        game_status = "Match Draw"
    }
    return game_status
}

async function end_process() {
    let end = confirm("Are You Sure To End This Match");
    if (end) {
        let match = await get_data(live);
        let game_status = add_status(match);
        push_data(past, match);
        set_data(status, game_status);
        window.location.href = 'start.html'

    } else { 
        alert("Aborted"); 
    }
}

end_match.addEventListener("click", end_process);

document.addEventListener("DOMContentLoaded", load_screen);
