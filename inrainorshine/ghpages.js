const ghpages = require("gh-pages")

// run build before this
    // takes the build folder (public in Svelte) as the first argument
    // 2: options in an object {}
    // 3: callback that takes error as argument
ghpages.publish("build", {
    branch: "master",
    message: "auto-commit",
    repo: "https://github.com/mathildeoldorf/mathildeoldorf.github.io",
    dest: "inrainorshine_weatherapp" // creates a folder and publish it there
}, (error) => {
    console.log(error)
})