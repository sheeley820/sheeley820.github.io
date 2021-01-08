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

const showAll = (arg) => {
  for(let tag of tags) {
    tag.closest(".archive-entry").classList.remove("collapse")
  }
}



//DONE - chris friday morning
//Add an "All" tag button to the blog that shows all the blog posts. DONE 
//Add an HTML page for each archived blog post.  At present you can't really click on them.
//Make some way for the user to navigate to each archived blog post.  You can choose how this is done.  Will the whole card be clickable, or just the photo, blog post title, etc.
//The pages for each blog post should look consistent with our other pages, meaning it should have the navbar and footer present, and looking the same.

//New TODO
//Flesh out the archive pages with more styling, images, etc.
//"Archive" on header could have a drop down that shows all archive pages?
//Build our list of Tag buttons based on the tags that exist in the blog posts (except maybe the all tag), also maybe make tags make more sense with what archive stories are
//Tags on the right side of the cards could also be clickable, so that selecting tag at top OR on the card filters tags

