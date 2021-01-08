let archiveList = [
    '<li><a class="dropdown-item" href="./archive/walkthrough.html">Red Dead Redemption Walkthrough</a></li>',
    '<li><a class="dropdown-item" href="./archive/devStories.html">Red Dead Redemption Development Stories</a></li>'
]

//the diveder to which we will insert adjacent html 'after end'
let divider = document.getElementById("dropDiv")

//function executing on load to populate archive posts into dropdown menu
window.onload = () => {
for (let i = 0; i < archiveList.length; i++) {
    divider.insertAdjacentHTML('afterend', archiveList[i])
    }
}
// function will sort archives newest => oldest, meaning last item in archive list will be at top of dropdown menu