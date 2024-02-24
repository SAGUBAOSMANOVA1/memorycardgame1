const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({ target: clickedCard }) {
    if ((cardOne !== clickedCard && !disableDeck) || (!cardOne && !disableDeck)) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return (cardOne = clickedCard);
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src;
        let cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        if (matched == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;
    } else {
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            cardOne = cardTwo = "";
            disableDeck = false;
        }, 1200);
    }
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        card.classList.remove("shake");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `assets/img-${arr[i]}.jpg`;
    });
}

shuffleCard();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

let flipsCount = 0;
let timer;

function flipCard({ target: clickedCard }) {
    if ((cardOne !== clickedCard && !disableDeck) || (!cardOne && !disableDeck)) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return (cardOne = clickedCard);
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src;
        let cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }

   
    flipsCount++;
    document.getElementById('flip-count').innerText = flipsCount;

    if (flipsCount === 1) {
        startTimer();
    }
}

function startTimer() {
    let timeLeft = 20;
    timer = setInterval(() => {
        document.getElementById('time').innerText = timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            alert("Game Over! Time's up!");
            restartGame();
        }
    }, 1000);
}

function restartGame() {
    clearInterval(timer);
    flipsCount = 0;
    document.getElementById('flip-count').innerText = flipsCount;
    document.getElementById('time').innerText = 20;
    shuffleCard();
}

function checkWinner() {
    if (matched === 8) {
        alert("WINNER!");
    }
}


