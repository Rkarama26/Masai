

let boxen = require('boxen')

function centerTitle(title, width) {
    const space = Math.max(0, width - title.length);
    const left = Math.floor(space / 2);
    const right = space - left;
    return " ".repeat(left) + title + " ".repeat(right);
}
const width = 40; // total width of the box


console.log(boxen('I am using my first external module', {
    title: centerTitle("Hurray!!!", width),
    borderStyle: 'classic',
    padding: 1
}))


console.log(boxen('I am using my first external module!', {
    title: centerTitle("Hurray!!!", width),
    padding: 1, margin: 1, borderStyle: 'doubleSingle'
}))


console.log(boxen('unicorns love rainbows', {
    title: centerTitle("Hurray!!!", width),
    borderStyle: "round",
    padding: 1
}))