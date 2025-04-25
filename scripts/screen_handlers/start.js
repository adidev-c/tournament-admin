import {
    get_data,
    teams,
    set_data,
    a_name,
    b_name,
    a_score,
    b_score,
    status,
    live
} from '../db/firebase.js'
//accessing elements from ui
const team1Select = document.getElementById('team1');
const team2Select = document.getElementById('team2');
const startMatchButton = document.getElementById('startMatchButton');
const errorMessage = document.getElementById('errorMessage');
//fetching teams to load in dropdown
function fetchTeamData() {
    get_data(teams).then(registered_teams => {
        if (registered_teams) {
            const entries = Object.values(registered_teams); 
            console.log(entries); 

            team1Select.innerHTML = `<option value="">Select a team</option>`;
            team2Select.innerHTML = `<option value="">Select a team</option>`;

            
            entries.forEach(team => {
                const option1 = document.createElement('option');
                option1.value = team;
                option1.textContent = team;
                team1Select.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = team;
                option2.textContent = team;
                team2Select.appendChild(option2);
            });

            
            team1Select.disabled = false;
            team2Select.disabled = false;
            validateSelection(); 
        } else {
            console.log("No teams found.");
        }
    }).catch(error => {
        console.error("Error fetching teams:", error);
    });
}

//validating selections fot same teams in both selection or empty selection
function validateSelection() {
    const team1 = team1Select.value;
    const team2 = team2Select.value;


    if (team1 === team2) {
        errorMessage.textContent = "Both teams cannot be the same!";
        errorMessage.style.display = "block";
        startMatchButton.disabled = true;
    } else {
        errorMessage.style.display = "none";
        startMatchButton.disabled = false;
    }
}

//deploy the match to database
function deploy_match(team1, team2) {
    const start_score = 0;
    const game_status = "live";
    var match = {};
    match.teama = {};
    match.teamb = {};
    match.teama.name = team1;
    match.teamb.name = team2;
    match.teama.score = start_score;
    match.teamb.score = start_score;
    set_data(status,game_status);
    set_data(live,match);

}
team1Select.addEventListener('change', validateSelection);
team2Select.addEventListener('change', validateSelection);

startMatchButton.addEventListener('click', () => {
    const team1 = team1Select.value;
    const team2 = team2Select.value;

    if (team1 && team2 && team1 !== team2) {
        deploy_match(team1, team2)
        window.location.href = 'admin.html';
    }
});

document.addEventListener("DOMContentLoaded", fetchTeamData)

