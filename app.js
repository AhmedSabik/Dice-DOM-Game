/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


var scores, roundScore, activePlayer, continuePlaying;

/* 

// This part was moved down to an initiate game function, and replased by function calling 

scores = [0,0]; 
roundScore = 0; 
activePlayer = 0; 

document.querySelector('.dice').style.display = 'none'; 

document.getElementById('score-0').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-1').textContent = 0;

*/

initiateGame(); 

document.querySelector('.btn-roll').addEventListener('click', function () {
   
   // ContinuePlaying allows player to continue playing the game when clicking btn-hold
   
   if (continuePlaying) {
   
      // 1. Random number 
      var dice = Math.floor(Math.random() * 6) + 1;
   
      // 2. Display result
      var diceDOM = document.querySelector('.dice');
      diceDOM.style.display = 'block';
      diceDOM.src = 'resources/dice-' + dice + '.png';
   
      // 3. Update the roundscore only IF the rolled number was NOT 1 
      if (dice !== 1) {
   
         // Add score
         roundScore += dice;
         document.querySelector('#current-' + activePlayer).textContent = roundScore;
   
      }
      else {
   
         // Switch to next player  
         nextPlayer();
      }
   
   }
   
   
   
}); 

document.querySelector(".btn-hold").addEventListener('click', function () {
   
   // ContinuePlaying allows player to continue playing the game when clicking btn-hold 
   
   if (continuePlaying) {
   
      // 1. Add Current score to GLOBAL score 
   
      scores[activePlayer] += roundScore;
   
      // 2. Update the UI (User Interface)
      document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
   
   
      // 3. Check if the player won the game 
   
      if (scores[activePlayer] >= 20) {
   
         document.querySelector("#name-" + activePlayer).textContent = "Winner!";
         document.querySelector(".dice").style.display = 'none';
         document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
         document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
         // ContinuePlaying blocks the game once a player is announced winner 
         continuePlaying = false;
   
      }
      else {
         // Switch to next player 
         nextPlayer();
      }
   
   }
   
});

document.querySelector(".btn-new").addEventListener('click', initiateGame); 



function nextPlayer() {
   
   // Switch to next player  
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
     roundScore = 0; 
     
     // Current score back to 0
     
     document.getElementById('current-0').textContent = '0'; 
     document.getElementById('current-1').textContent = '0';
     
     // Togle active class for active players 
     
     document.querySelector(".player-0-panel").classList.toggle("active"); 
     document.querySelector(".player-1-panel").classList.toggle("active");
     
     // Hide dice 
     document.querySelector('.dice').style.display = 'none'; 
}

function initiateGame() {
   
   scores = [0, 0];
   roundScore = 0;
   activePlayer = 0;
   continuePlaying = true; 
   
   document.querySelector('.dice').style.display = 'none';
   
   document.getElementById('score-0').textContent = 0;
   document.getElementById('current-0').textContent = 0;
   document.getElementById('score-1').textContent = 0;
   document.getElementById('current-1').textContent = 0;
   document.getElementById('name-0').textContent = "Player 1";
   document.getElementById('name-1').textContent = "Player 2";
   document.querySelector(".player-0-panel").classList.remove("winner");
   document.querySelector(".player-1-panel").classList.remove("winner");
   document.querySelector(".player-0-panel").classList.remove("active");
   document.querySelector(".player-1-panel").classList.remove("active");
   document.querySelector(".player-0-panel").classList.add("active");

}

 
//document.querySelector('.dice').style.display = 'none';  