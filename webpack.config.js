// i made this file
// the logic is that HTML5 canvas wont work anyway on sub-ES6 browsers anyways 
// so why bother using babel to convert js to those standards anyway?
// dont know which one is more obsolescent maybe there is a bigger difference than i think?
const path = require("path");

module.exports = {
    context: __dirname,
    entry: "./src/index.js", // it starts buliding its dependency graph here
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },

};


