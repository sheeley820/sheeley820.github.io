//anywhere this file is required, baseUrl will hold the enviornment url
var baseUrl

const getbaseURL = () => {
    if (process.env.ENVIRONMENT == "heroku") {
        baseUrl = "https://hidden-shore-45779.herokuapp.com/"
    } else {
        baseUrl = "http://127.0.0.1:5000/"
    }
}

getbaseURL()

module.exports = { baseUrl }