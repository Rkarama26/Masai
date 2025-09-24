// cjs module 

function fun() {
    console.log("CJS Module");
    for (let i = 0; i < 5; i++) {
        console.log(i);
    }
}
function sum(a, b) {
    return a + b;
}

export default function fun2() {
    console.log("ES6 Module");
}


// by this all function are exported at once
// module.exports = { fun, sum };