const fs = require("fs");

Promise.resolve().then(() => {
  process.nextTick(() => console.log("nextTick inside promise 1"));
  Promise.resolve().then(() => console.log("promise1 inside promise 2"));
});

setTimeout(() => {
  console.log("timeout 3");
  setTimeout(() => console.log("timeout inside timeout 4"), 0);
  setImmediate(() => console.log("immediate inside timeout 5"));
  process.nextTick(() => console.log("nextTick inside timeout 6"));
  Promise.resolve().then(() => console.log("promise1 inside timeout 7"));
}, 0);

setImmediate(() => {
  console.log("immediate 8");
  setTimeout(() => console.log("timeout inside immediate 9"), 0);
  setImmediate(() => console.log("immediate inside immediate 10"));
  process.nextTick(() => console.log("nextTick inside immediate 8+"));
  Promise.resolve().then(() => console.log("promise1 inside immediate 8+"));
  fs.readFile(__filename, () => {
    console.log("I/O inside immediate 11");
    setTimeout(() => console.log("timeout inside I/O inside immediate 12"), 0);
    setImmediate(() => console.log("immediate inside I/O inside immediate 13"));
    process.nextTick(() => console.log("nextTick inside I/O inside immediate 11+"));
    Promise.resolve().then(() => console.log("promise1 inside I/O inside immediate 11+"));
  });
});

fs.readFile(__filename, () => {
  console.log("I/O 14");
  setTimeout(() => console.log("timeout inside I/O 15"), 0);
  setImmediate(() => console.log("immediate inside I/O 16"));
  process.nextTick(() => console.log("nextTick inside timeout 14+"));
  Promise.resolve().then(() => console.log("promise1 inside timeout 14+"));
});

process.nextTick(() => console.log("nextTick 17"));

// output

// nextTick 17
// promise1 inside promise 2
// nextTick inside promise 1
// timeout 3
// nextTick inside timeout 6
// promise1 inside timeout 7
// immediate 8
// nextTick inside immediate 8+
// promise1 inside immediate 8+
// immediate inside timeout 5
// timeout inside timeout 4
// immediate inside immediate 10
// timeout inside immediate 9
// I/O 14
// nextTick inside timeout 14+
// promise1 inside timeout 14+
// immediate inside I/O 16
// timeout inside I/O 15
// I/O inside immediate 11
// nextTick inside I/O inside immediate 11+
// promise1 inside I/O inside immediate 11+
// immediate inside I/O inside immediate 13
// timeout inside I/O inside immediate 12
