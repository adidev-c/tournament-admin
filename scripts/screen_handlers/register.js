import { 
    set_data,
    push_data,
    teams
 } from '../db/firebase.js'
//accessing elements from ui
const registerButton = document.getElementById('registerButton');
const usernameInput = document.getElementById('username');
const end_btn = document.getElementById("endButton");


registerButton.addEventListener('click', () => {
  const username = usernameInput.value.trim();

  if (username !== "") {
    push_data(teams,username);//pushing team to a list in database
    usernameInput.value='';
  } else {
    alert("Please enter a name before proceeding.");
  }
});

end_btn.addEventListener("click",()=>{
  window.location.href = ''
})