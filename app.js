/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, diceIcon;
diceIcon = document.querySelector('.dice');


// Declare a game initialisation function
function init() {
  // Set all round and global scores to zero and designating Player 1 as the active player
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  // Hide the dice icon
  //diceIcon.style.display = 'none';
  // Set all round and global score displays to zero
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.btn-hold').disabled = false;
  document.querySelector('.btn-roll').disabled = false;

  document.querySelector('.player-0-panel').classList.add('active');
};

init();

// Declaring a function to change the active player
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  diceIcon.style.display = 'none';
}

// Set up the 'roll dice' button
document.querySelector('.btn-roll').addEventListener('click', function() {
  // Generate a random number
  diceRoll = Math.floor(Math.random() * 6 + 1);

  // Display the relevant dice icon based on result
  diceIcon.src = 'dice-' + diceRoll + '.png';
  diceIcon.style.display = 'block';

  // Update the round score if result was NOT a 1
  if (diceRoll !== 1) {
    roundScore += diceRoll;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  // If player rolls a 1, then switch players
  } else {
    nextPlayer();
  }
});

// Set up the 'hold' button
document.querySelector('.btn-hold').addEventListener('click', function() {
  // Add round score to global score
  scores[activePlayer] += roundScore;

  // Update the UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  // Check if player won game
  if (scores[activePlayer] >= 100) {
    document.getElementById('name-' + activePlayer).textContent = 'WINNER!'
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('.btn-hold').disabled = true;
    document.querySelector('.btn-roll').disabled = true;
  } else {
    nextPlayer();
  };
});

function newGame() {
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  init();
}

// Set up the 'new game' button to reset the game
document.querySelector('.btn-new').addEventListener('click', newGame);
