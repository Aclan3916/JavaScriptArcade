//getElementById - a bit faster and slightly more simple
//querySelector - can do what getElementbyId does + more and accepts and CSS selector
//like .class, #id, div > span, [data-type="primary"] are examples

//building node list kinda like array
const choices = document.querySelectorAll('.choice');
const choicesLabel = document.querySelectorAll('.choice-label')
//grabbing other things we need like score, result, restart + modal
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const playerHand = document.getElementById('player-hand');
const computerHand = document.getElementById('computer-hand');

const scoreboard = {
    player: 0,
    computer: 0
}

//Play game function
function play(e) {
    restart.style.display = 'inline-block';
    const playerChoice = e.target.id;
    
    const playerHand = document.getElementById('player-hand');
    const computerHand = document.getElementById('computer-hand');
  //showCountdown is a regular function that runs and shows Rock..Paper..Scissors.. 
  //after the final word, it calls the main game logic via a callback
  //arrow function is the callback
  //first do the countdown, then do the rest of the game...
    showCountdown(() => {
        const computerChoice = getComputerChoice();
        const winner = getWinner(playerChoice, computerChoice);

        playerHand.className = `fas fa-hand-${playerChoice} fa-5x`;
        computerHand.className = `fas fa-hand-${computerChoice} fa-5x`;
      
        modal.style.display = 'block';
   
        showWinner(winner, computerChoice);

        choices.forEach(x => x.style.display = 'grid');
        choicesLabel.forEach(x => x.style.display = 'flex');

    })

}

//GET computer Choice
function getComputerChoice() {
    const randomDecimal = Math.random();

    if(randomDecimal < 0.34)
    {
        return 'rock'
    }
    else if(randomDecimal <= 0.67)
    {
        return 'paper';
    }
    else
    {
        return 'scissors';
    }
}

//GET winner
function getWinner(playerChoice, computerChoice)
{
    //if they choose the same
    if(playerChoice === computerChoice){
        return 'draw';
            //if player chooses rock && computer chooses paper
    } else if (playerChoice === 'rock' && computerChoice === 'paper'){
        return "computer"

         //if player chooses rock && computer chooses scisscors
    }else if (playerChoice === 'rock' && computerChoice === 'scissors'){
        return "player"

          //if player chooses paper && computer chooses rock
    }else if (playerChoice === 'paper' && computerChoice === 'rock'){
        return "player"

    //if player chooses paper && computer chooses scisscors
    }else if (playerChoice === 'paper' && computerChoice === 'scissors'){
        return "computer"

    //if player chooses scissors && computer chooses rock
    }else if (playerChoice === 'scissors' && computerChoice === 'rock'){
        return "computer"
         //if player chooses scissors && computer chooses paper
    }else if (playerChoice === 'scissors' && computerChoice === 'paper'){
        return "player"
    }
    
    //simpler way of doing it 

    // const winConditions = {
    //     rock: 'scissors',
    //     paper: 'rock',
    //     scissors: 'paper',
    //   };
      
    //   if (playerChoice === computerChoice) {
    //     return 'draw';
    //   } else if (winConditions[playerChoice] === computerChoice) {
    //     return 'player win';
    //   } else {
    //     return 'player lose';
    //   }
}

function showCountdown(callback){

    const countdown = document.getElementById('countdown');

    choices.forEach(x => x.style.display = 'none');
    choicesLabel.forEach(x => x.style.display = 'none');

    const words = ['Rock...', 'Paper...', 'Scissors...'];
    let i = 0; 
     
    //reset the hands
     playerHand.className = 'fas fa-hand-rock fa-5x';
     computerHand.className = 'fas fa-hand-rock fa-5x';
     
     //show the hands
     playerHand.style.display = 'inline-block';
     computerHand.style.display = 'inline-block'; 

    const interval = setInterval(() => {

    countdown.innerText = words[i];

     //add class to each //trigger bounce animation 
     playerHand.classList.add('animate-hand');
     computerHand.classList.add('animate-hand');
    
     //Remove the animation class so it can be replayed
     setTimeout(() => {
         playerHand.classList.remove('animate-hand');
         computerHand.classList.remove('animate-hand')
 
     }, 300)

        i++;

        if(i === words.length) {
            clearInterval(interval);

            setTimeout(() => {
                countdown.innerText = ''; //Clear after it's done
                callback(); // Run the main logic after countdown
            }, 500);
        }
    }, 600) // 600ms between each word
}

//show winner/score, increment score by one and show modal dynamically
function showWinner(winner, computerChoice){
    if(winner === 'player') {

        scoreboard.player++;
    
        result.innerHTML =
        `<h1 class="text-win"> You Win </h1>
        <i class="fas fa-hand-${computerChoice} fa-5x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>`;
    } else if(winner === 'computer')
    {
         scoreboard.computer++;
     
         result.innerHTML =
         `<h1 class="text-lose"> You Lose </h1>
         <i class="fas fa-hand-${computerChoice} fa-5x"></i>
         <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>`;
    } else {
        result.innerHTML =
        `<h1> It is a draw </h1>
        <i class="fas fa-hand-${computerChoice} fa-5x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>`;
    }
    //Show score
    score.innerHTML =
     `<p> 🧑‍💻 ${scoreboard.player}</p>
      <p> 🤖 ${scoreboard.computer}</p>`;

}

function restartGame()
{
    scoreboard.player = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
    <p> 🧑‍💻 0</p>
    <p> 🤖 0</p>`
    result.innerHTML = '';
    restart.style.display = 'none';

    playerHand.style.display = 'none';
    computerHand.style.display = 'none';
}
//Clear modal
function clearModal(e)
{
    if(e.target == modal)
    {
        modal.style.display = 'none';
    }
}

//Event Listeners
//need to loop through choices
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal)
restart.addEventListener('click', restartGame)

//Overall Notes 
// 🔘 Click Rock → triggers play()

// 🧠 play() calls showCountdown(callback)

// 🕒 showCountdown() runs countdown animation

// ✅ When countdown is done, it calls callback()

// 🎮 Callback runs:

// getComputerChoice()

// getWinner()

// Update hand icons

// showWinner()