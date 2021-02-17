let baseUrl = window.location.host
console.log(baseUrl)

const buildArchiveElements = (archiveItem, needsPath) => {
    let prependPath = needsPath ? "./archive/" : ""
    return `<li><a class="dropdown-item" href="${prependPath}archiveTemplate.html?stub=${archiveItem._id}">${archiveItem.title}</a></li>`
}

let divider = document.getElementById("dropDiv")
let herokuURL = baseUrl
// $.get(herokuURL, () => {
// let listOfBlop
//  do something with the response
// })


// //function executing on load to populate archive posts into dropdown menu
// // function will sort archives newest => oldest, meaning last item in archive list will be at top of dropdown menu
// // if statement looks at document.title and decides whether we are on a "main" or "archive" page and sorts through appropriate list
// // this is necessary because linking to an archive page from an archive page will require a different path due to archive pages being hosted in a subdirectory

let blogList;

function getBlogPost(postId) {
    return blogList.filter((post) => {
        return post._id == postId
    })
}

window.onload = () => {

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": baseUrl,
        "method": "GET",
        "headers": {}
    };

    $.ajax(settings).done(function (response) {
        blogList = response;
        console.log(blogList)
        if(!document.documentURI.includes('Template')) {
            for (item of blogList) {
                divider.insertAdjacentHTML('afterend', buildArchiveElements(item, true))
            }
        } else {
            for (item of blogList) {
                divider.insertAdjacentHTML('afterend', buildArchiveElements(item, false))
                }
        } 
    });
}

