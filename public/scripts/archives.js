const BASE_URL = window.location.host
const DIVIDER = document.getElementById("dropDiv")
let herokuURL = BASE_URL
let blogList;
const ajaxSettings = {
    "async": true,
    "crossDomain": true,
    "url": "/archive?postID=111",
    "method": "GET",
    "headers": {}
};

window.onload = () => {
    $.ajax(ajaxSettings).done(function (response) {
        blogList = response
        let isTemplatePage = !document.documentURI.includes('Template')
        blogList.forEach((item) => {
            DIVIDER.insertAdjacentHTML('afterend', buildArchiveElements(item, isTemplatePage))
        })
    });
}

const buildArchiveElements = (archiveItem, needsPath) => {
    let prependPath = needsPath ? "./archive/" : ""
    return `<li><a class="dropdown-item" href="${prependPath}archiveTemplate.html?stub=${archiveItem._id}">${archiveItem.title}</a></li>`
}

function getBlogPost(postId) {
    return blogList.filter( post =>  post._id == postId )
}