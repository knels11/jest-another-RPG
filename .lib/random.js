//random.js is exporting a function
function randomNumber() {
    return Math.floor(Math.random() * 9 + 1);
}

module.exports = randomNumber;