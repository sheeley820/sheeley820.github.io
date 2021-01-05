let tags = document.getElementsByClassName("tag-container")

const filterFunc = function(arg) {
  for(let tag of tags) {
    let tagFound = false;
    for(child of tag.children) {
      if (arg.innerText === child.innerText) {
        tagFound = true
      }
    }
    if (!tagFound) {
      tag.closest(".archive-entry").classList.add("collapse")
    } else {
      tag.closest(".archive-entry").classList.remove("collapse")
    }
    console.log(tag)
  }
  
}

//How do we retrive all the tags present
//   - Retrieve the divs that contain the tags by giving them a tag-container class name, then go through child elements
//Do do we identify the card that tag lives in?
//   - container.closest(".archive-entry")
//How do we hide those cards?
//   - let col = document.getElementById("collapse-me").classList.remove("collapse")
//   - let col = document.getElementById("collapse-me").classList.add("collapse")

//if (a.innerText !== b.innerText) {
  // hide the thing
// }