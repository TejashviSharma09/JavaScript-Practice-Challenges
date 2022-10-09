//Challenge 1: Your Age in Days

function ageInDays (){
    var birthYear = prompt('What year were you born in?');
    var ageDays = (2021 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageDays + ' days old.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

//Challenge 2: Dog Generator
function generateDog() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-dog-gen');
    image.src = "static/images/dog.jpg";
    div.appendChild(image);
}

//Challenge 3: Rock, Paper, Scissors
/*
Defining the skeleton 1st and then proceeding by creating functions
for different tasks, using functions makes tracking errors easy
*/
function rpsGame(yourChoice) {
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    
    botChoice = numberToChoice(randToRpsInt());
    console.log('Computer choice: ', botChoice);
    
    results = decideWinner(humanChoice, botChoice); // [1,0] human won | bot lost
    console.log(results);
    
    message = finalMessage(results); // {'message': 'You Won!', 'color': 'green'}
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

//Generating 0,1,2 ramdomly
function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

/*We can use if-else but we gotta deifne 9 conditions to conclude the winner
or we can use the method below SMART WORK*/
function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': {'rock': 0.5, 'paper': 0, 'scissors': 1,}, 
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0,},
        'scissors': {'rock': 0, 'paper': 1, 'scissors': 0.5,},
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {'message': 'You lost!', 'color': 'red'};
    }else if (yourScore === 0.5) {
        return {'message': 'You tied!', 'color': 'yellow'};
    }else {
        return {'message': 'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    }

    //removing all the images before we display result
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    //Creating div elements where we will show the result
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}


//Challenge 4: Change the Color of All Buttons

var all_buttons = document.getElementsByTagName('button');
//console.log(all_buttons);   //Object or Dict of buttons on the webpage (Inspect and See)
//console.log(all_buttons[1]);    console.log(all_buttons[1].classList);  console.log(all_buttons[1].classList[1]);

//Stroing the Colors of buttons in array so we can later use it in reset operation
var copyAllButtons = [];
for (let i=0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}
//console.log(copyAllButtons);

function buttonColorChange(colorOption){
    //console.log(colorOption.value);   //Selection user makes, like Red Green Random Reset
    if (colorOption.value === 'red') {
        buttonsRed();
    }else if (colorOption.value === 'green') {
        buttonsGreen();
    }else if (colorOption.value === 'reset') {
        buttonColorReset();
    }else if (colorOption.value === 'random') {
        randomColors();
    }
}

function buttonsRed() {
    for (let i=0; i< all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i=0; i< all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

    for (let i=0; i < all_buttons.length; i++) {
        //Notice we generates randomNumber inside the loop
        let randomNumber = Math.floor(Math.random() * 4);   // Generates 0,1,2,3 randomly
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}


//Challenge 5: Blackjack

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1,11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,   //This will keep track whether the Stand Mode is activated or not, ture if someone clicks Stand button
    'turnsOver': false, //This means when Hit and Stand button is done clicked completely and not Deal button will get activated
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        //console.log(card);
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
        //console.log(YOU['score']);
    }

}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;    //It is Backticks not quotes (String Templating)
        cardImage.style.height = '150px';   //Resizing Image as original image is too big
        cardImage.style.width = '150px'
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }

}

function blackjackDeal() {

    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] === false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        /*We use loop to delete all images once user clicks on Deal button, otherwise without
        loop only one image will get deleted with every click */

        for(i=0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for(i=0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true;

    }


}

function updateScore(card, activePlayer) {

    if (card === 'A') {
        //If adding 11 keeps me below 21 then add 11, otherwise add 1
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }

    }else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }

}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true){
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);

    }
    
    blackjackGame['isStand'] = false;


    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
    //console.log(blackjackGame['turnsOver']);
    
}

//Compute winner and return who just won
//update the wins, losses and draws
function computeWinner() {
    let winner;

    if (YOU['score'] <= 21){
        //condition: higher score than dealer or when dealer busts but you are 21 or under
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            //console.log('You won!');
            blackjackGame['wins']++;
            winner = YOU;

        }else if (YOU['score'] < DEALER['score']) {
            //console.log('You lost!');
            blackjackGame['losses']++;
            winner = DEALER;

        }else if (YOU['score'] === DEALER['score']) {
            //console.log('You drew!');
            blackjackGame['draws']++;
        }

    //condition: when user busts but dealer doesn't
    }else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        //console.log('You lost!');
        blackjackGame['losses']++;
        winner = DEALER;
    
    //condition: when you AND the dealer busts
    }else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        //console.log('You drew!');
        blackjackGame['draws']++;
    }

    //console.log(blackjackGame);
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {


        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
    
        }else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
    
        }else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }
    
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }

}







