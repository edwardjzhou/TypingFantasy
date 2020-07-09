// i made this file
// the logic is that HTML5 canvas wont work anyway on sub-ES6 browsers anyways
// so why bother using babel to convert js to those standards anyway?
// dont know which one is more obsolescent maybe there is a bigger difference than i think?

// RE: code splitting chinese and english dictionaries
// tried: 1. conditional require(''), conditional dynamic import(), multiple entry points, chunks, using eval() and doc.createElement

{
  /* <script src="myscript.js"></script>

    <script async src="myscript.js"></script>

    <script defer src="myscript.js"></script>
Without async or defer, browser will run your script immediately, before rendering the elements that's below your script tag.

With async(asynchronous), browser will continue to load the HTML page and render it while the browser load and execute the script at the same time.

With defer, browser will run your script when the page finished parsing. (not necessary finishing downloading all image files.This is good.) */
}
// ASYNC:
// Make par­al­lel requests to fetch the files.
//     Con­tinue pars­ing the doc­u­ment as if it was never interrupted.
//         Exe­cute the indi­vid­ual scripts the moment the files are downloaded.
// DEFER: same as ASYNC except +Exe­cute each script in the order they were encoun­tered in the document.
// script = document.createElement('script');
// script.setAttribute('src', url);
// document.body.appendChild(script);

const path = require("path");

module.exports = {
  context: __dirname,
  entry: {
    // entry point splitting
    index: "./src/index.js", // it starts buliding its dependency graph here
    // another: './src/dictionaryChinese.js',
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    // publicPath: 'dist/',
    filename: "main.js",
    chunkFilename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
  },
};

// In package.lock.json "requires" reflects dependencies from package.json file, while "dependencies" reflects actually installed dependencies in node_modules folder of this dependency.
