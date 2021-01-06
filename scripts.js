let tags = document.getElementsByClassName("tag-container")
let tagButtons = document.getElementsByClassName("tag")

const deactivateButtons = (arg) => {
  for(let button of tagButtons) {
    if (arg != button) {
      button.classList.remove("active")
    }
  }
}

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
  }
}

//TODO
//-  Make the tag button look clicked or active to show what tag is actively being filtered
//  - Add data-bs-toggle="button" to our button.
//  FIX-ME
//  - Two tag buttons can appear selected, even though only one tag genre is being shown
//  - When a button is deselected (clicked twice) that tag genre is still shown.  Clicking it again should make all block posts re-appear.
//
//-  Have a way to show all blog posts again
//-  Build our list of Tag buttons based on the tags that exist in the blog posts (except maybe the all tag)
//