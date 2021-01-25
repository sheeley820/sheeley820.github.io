let listOfElements = $(".card-flip")
// counting flips
let flipCount = 0

// creating list of each "tile"
$(listOfElements).toggleClass("flip")

// each time a tile is clicked, turn it to it's opposite side
// also incrementing flip count
const flipCard = (el) => {
    if (el.style.transform == "rotateY(180deg)") {
        el.style.transform = ""
        el.classList.remove("flipped")
    } else {
        el.style.transform = "rotateY(180deg)";
        el.classList.add("flipped")
    } 
    cardClick(el)
}


// when reset button is clicked all cards are flipped to empty side and are randomized
const flipAll = () => {
    window.location.reload()
}

let pairOfCards = []

const checkCard = (el) => {
    let imgName = el.src
    if (pairOfCards.length > 1) {
        pairOfCards[0] == imgName
        //Keep cards flipped over
        //Disable onclick()
    } else {
        //flip over both cards
    }
}


let randomImg = () => {
    //each array item should be image file path
    let imgArr = ["img1", "img2", "img3", "img4", "img5", "img6", "img7", "img8", "img8", "img1", "img2", "img3", "img4", "img5", "img6", "img7"]

    function shuffleArray(array) {
        let shuffledArray = array
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray
    }
    let shuffledArray = shuffleArray(imgArr)
    
    let imageList = $(".card-img-top").each((ind, el) => {
        $(el).attr("src", `./images/${shuffledArray.pop()}.svg`)
    })
}

//randomizing at start
randomImg()
//functionality to keep cards that are matching, and flipping cards that are not
let matchList = []
const cardClick = function(el) {
    let flippedCards = $(".flipped")
    console.log(flippedCards)
    if (flippedCards.length == 2) {
        if($(flippedCards[0]).find("img").attr("src") == $(flippedCards[1]).find("img").attr("src")) {
            flippedCards.each((index, el) => {
                el.classList.add("matched")
                el.classList.remove("flipped")
                el.onclick = ""
            })
        } else {
            
            const itter = () => {
                flippedCards.each((index, el) => {
                el.style.transform = "none"
                el.classList.remove("flipped")
            })}
            setTimeout(itter, 1000)
        }
        if ($(".matched").length == listOfElements.length) {

            setTimeout(alert, 1000, "You Win!")
        }
    }
}
    //     // check if cards with flipped class are the same or different
    //     // remove flip class at the end
    //     $(".flipped").each(function ( index ) {
    //         // console.log(index + $(this).find("img").attr("src"))
    //         matchList.push($(this).find("img").attr("src"))
    //     })
    //     if (matchList[0] === matchList[1]) {
    //         $(".flipped").each(function ( index, el) {
    //             // make them stay

    //             // but also remove class flipped
    //             el.classList.remove("flipped")
    //         })
    //     } else {
    //         $(".flipped").each(function ( index, el ) {
    //             // make them flip back over
    //             $(el).css("transform", "none")
    //             // but also remove class flipped
    //             el.classList.remove("flipped")
    //         })
    //     }
    // }

    //     for (el of listOfElements) {
    //         if (el.style.transform == "rotateY(180deg)") {
    //             matchList.push(el)
    //         }
    //     }
    //     // check images of two items in matchList, if they are the same stay flipped, if not flip back
    //     console.log($(matchList[0]).find("img").attr("src"))
    //     console.log($(matchList[1]).find("img").attr("src"))
    //     if ($(matchList[0]).find("img").attr("src") === $(matchList[1]).find("img").attr("src")) {
    //         console.log("match")
    //     } else {
    //         console.log("no match")
    //     }
    // //reset flipcount
    // flipCount = 0;
    // matchList = []


//todo
// add button for reset - done
// when two cards are flipped, keep them if they are the same, else flip them over
// display a message when all cards are flipped
// maybe a show all button
// rewrite with jquery