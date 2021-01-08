//archive list for "Main" pages.. pages that are not within a subdirectory
let mainList = [
    '<li><a class="dropdown-item" href="./archive/walkthrough.html">Red Dead Redemption Walkthrough</a></li>',
    '<li><a class="dropdown-item" href="./archive/devStories.html">Red Dead Redemption Development Stories</a></li>'
]
//archive list for pages within "archive" subdirectory
let archiveList = [
    '<li><a class="dropdown-item" href="walkthrough.html">Red Dead Redemption Walkthrough</a></li>',
    '<li><a class="dropdown-item" href="devStories.html">Red Dead Redemption Development Stories</a></li>'
]

//the diveder to which we will insert adjacent html 'after end'
let divider = document.getElementById("dropDiv")


//function executing on load to populate archive posts into dropdown menu
// function will sort archives newest => oldest, meaning last item in archive list will be at top of dropdown menu
// if statement looks at document.title and decides whether we are on a "main" or "archive" page and sorts through appropriate list
// this is necessary because linking to an archive page from an archive page will require a different path due to archive pages being hosted in a subdirectory
window.onload = () => {
    if (document.title === 'Home' || document.title === 'Archive') {
    for (let i = 0; i < mainList.length; i++) {
        divider.insertAdjacentHTML('afterend', mainList[i])
        }
    } else if (document.title === 'Dev Stories' || document.title === 'Walkthrough') {
        for (let i = 0; i < archiveList.length; i++) {
            divider.insertAdjacentHTML('afterend', archiveList[i])
            }
    } 
}
