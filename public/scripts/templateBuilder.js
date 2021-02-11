function buildHTML(postObject) {
    return `
    <div class="container">
        <div class="row">
          <!-- Post Content Column -->
          <div class="col-lg-12">
            <h1 class="text-center">${postObject.title}</h1>
            <img class="img-fluid col-lg-6 rounded mx-auto d-block" src="${postObject.imgURL}" alt="Red Dead Title Image">
            <p>${postObject.body}
            </p>
          </div>
        </div>
      </div>
      `
}

module.exports = {buildHTML }