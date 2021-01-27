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
