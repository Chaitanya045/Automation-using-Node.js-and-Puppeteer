// let arr = [1, 2, 3, 4, "s", "c", { name: "chaitanya", role: "PAT" }];
// let test = Array.isArray(arr);

// const delay = (ms, x) => new Promise((resolve) => setTimeout(resolve(x), ms));
// // dealy(3000).then(()=>console.log(test))

// (function run() {
//   let a = delay(1000, 1);
//   a.then(async function (x) {
//     let y = delay(2000, 2);
//     let z = delay(1000, 3);
//     let p = delay(1000, 4);
//     let q = delay(2000, 5);
//     console.log((await x) + (await y) + (await z) + (await p) + (await q));
//   });
// })();

// function call() {
//   let count = 0;
//   (function see() {
//     count++;
//     console.log(count);
//   })();
//   console.log(count)
// }

// call()


let fn = function prod(a, b){
  return a * b;
}

console.log(fn);

fn = 3;

