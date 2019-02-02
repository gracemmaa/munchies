//Card flipping

const cards = document.querySelectorAll('.card');

let FlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declaring timer variables
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;

document.body.onload = startGame();

function startGame() {
    shuffleCards();

    // reset match count
	  match = 0;

	// reset moves
    moves = 0;
    counter.innerHTML = moves;

    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = minute + " mins " + second + " secs";
    clearInterval(interval);
}

function flipCard() {
    moveCounter();

  if (lockBoard) return;
  this.classList.add('flip');

  if (!FlippedCard) {
  	FlippedCard = true;
  	firstCard = this;
  	return;
  }

  secondCard = this;
  FlippedCard = false;

  checkForMatch();
}

function checkForMatch() {
	if (firstCard.dataset.framework === secondCard.dataset.framework) {
		disableCards();
		return;
    matches++;
	}

	unflipCards();
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
	lockBoard = true;

	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		lockBoard = false;
	}, 900);
}

function shuffleCards() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
}

cards.forEach(card => card.addEventListener('click', flipCard));

function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
}

// Timer
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute + " mins " + second + " secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
