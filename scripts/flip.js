let listOfElements = document.querySelectorAll(".card-flip")

for(el of listOfElements) {
    el.classList.toggle("flip");
}

const flipCard = (el) => {
    console.log("Hello")
    if (el.style.transform == "rotateY(180deg)") {
        el.style.transform = ""
    } else {
        el.style.transform = "rotateY(180deg)";
    }   
}

let pairOfCards = []

const checkCard = (el) => {
    let imgName = this.src
    if (pairOfCards.length > 1) {
        pairOfCards[0] == imgName
        //Keep cards flipped over
        //Disable onclick()
    } else {
        //flip over both cards
    }
}


//Function should run on "reset button" click
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
    
    let imageList = document.getElementsByClassName("card-img-top")

    for(image of imageList) {
        image.src = `./images/${shuffledArray.pop()}.svg`
    }
}
randomImg()

    
    // //counters for each image
    // let imgA = 0;
    // let imgB = 0;
    // let imgC = 0;
    // let imgD = 0;
    // let imgE = 0;
    // let imgF = 0;
    // let imgG = 0;
    // let imgH = 0;

    // //initializing counter before loops
    // let index = 0;
    
    // //loop through once for each card, setting a random image
    // let i = 0
    // let j = 0
    // while (i <= 16) {
    //     //imageToSet will be a random image from the array
    //     let imageToSet = images[Math.floor(Math.random()*imgArr.length)]
    //     //the src of each image in order will be set to imageToSet
    //     document.getElementById(`img${i}`).src = imageToSet;

    //     //this loop should add one to the counter checking each image's source
    //     while (j <= 16) {
    //         switch(document.getElementById(`img${j}`).src) {
    //             case "img0":
    //                 imgA++
    //                 break;
    //             case "img1":
    //                 imgB++
    //                 break;
    //             //add other image cases
    //         }
    //     }
    //     // checking if the counter for each image is over 1, in which case that image is removed from the array and random element is preserved
    //     if (imgA > 1) {
    //         index = imgArr.indexOf(imgA)
    //         imgArr.splice(index, 1)
    //     } else if (imgB > 1) {
    //         index = imgArr.indexOf(imgB)
    //         imgArr.splice(index, 1)
    //     } // at last else.. do nothing

    //     i++
    // }
