(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class ArchiveItems {
    constructor(title, file) {
      this.title = title;
      this.file = file;
    }
  }

const walkthrough = new ArchiveItems("Red Dead Redemption Walkthrough", "walkthroughStub")
const devStories = new ArchiveItems("Red Dead Redemption Development Stories", "devStoriesStub")

let blogList = [ walkthrough, devStories]

module.exports = {blogList}

},{}],2:[function(require,module,exports){
const blogList = require("./archiveclass").blogList

const buildArchiveElements = (archiveItem, needsPath) => {
    let prependPath = needsPath ? "./archive/" : ""
    return `<li><a class="dropdown-item" href="${prependPath}archiveTemplate.html?stub=${archiveItem.file}">${archiveItem.title}</a></li>`
}

let divider = document.getElementById("dropDiv")


// //function executing on load to populate archive posts into dropdown menu
// // function will sort archives newest => oldest, meaning last item in archive list will be at top of dropdown menu
// // if statement looks at document.title and decides whether we are on a "main" or "archive" page and sorts through appropriate list
// // this is necessary because linking to an archive page from an archive page will require a different path due to archive pages being hosted in a subdirectory
window.onload = () => {
  if (document.title === 'Home' || document.title === 'Archive') {
  for (item of blogList) {
      divider.insertAdjacentHTML('afterend', buildArchiveElements(item, true))
      }
  } else {
      for (item of blogList) {
          divider.insertAdjacentHTML('afterend', buildArchiveElements(item, false))
          }
  } 
}


},{"./archiveclass":1}]},{},[2]);
