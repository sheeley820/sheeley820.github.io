let listOfElements = $(".card-flip")
listOfElements.toggleClass("flip")

//randomizing at start
randomizeCardImages()

// each time a tile is clicked, turn it to it's opposite side
// also incrementing flip count
const flipCard = (el) => {
    toggleCardTransform(el)
    checkForMatch()
    checkForWin()
}

const toggleCardTransform = (el) => {
    if (el.style.transform == "rotateY(180deg)") {
        el.style.transform = "none"
        el.classList.remove("flipped")
    } else {
        el.style.transform = "rotateY(180deg)";
        el.classList.add("flipped")
    }
}

// when reset button is clicked all cards are flipped to empty side and are randomized
const flipAll = () => {
    window.location.reload()
}

let randomizeCardImages = () => {
    let shuffledArray = shuffleArray(imgArr)
    
    $(".card-img-top").each((ind, el) => {
        $(el).attr("src", `./images/${shuffledArray.pop()}.svg`)
    })
}

function shuffleArray() {
    let imgArr = []
    for(let num = 1; num <= 8; num++) {
        imgArr.push(`img${num}`)
        imgArr.push(`img${num}`)
    }
    imgArr.forEach((val, ind, arr) => {
        const cardTwo = Math.floor(Math.random() * (ind + 1));
        [val, arr[cardTwo]] = [arr[cardTwo], val]
    })
    return imgArr
}

const checkForMatch = function() {
    let flippedCards = $(".flipped")
    if (flippedCards.length == 2) {
        if(cardsMatch()) {
            setAsMatched(flippedCards)
        } else {
            resetCards(flippedCards)
        }
    }
}

const cardsMatch = (cardPair) => {
    return cardPair[0].find("img").attr("src") == cardPair[1].find("img").attr("src")
}

const setAsMatched = (cardPair) => {
    flippedCards.each((index, el) => {
        el.classList.add("matched")
        el.classList.remove("flipped")
        el.onclick = ""
    })
}

const resetCards = (cardPair) => {
    const itter = () => {
        cardPair.each((index, el) => {
        el.style.transform = "none"
        el.classList.remove("flipped")
    })}
    setTimeout(itter, 1000)
}

const checkForWin = () => {
    if ($(".matched").length == listOfElements.length) {
        setTimeout(alert, 1000, "You Win!")
    }
}