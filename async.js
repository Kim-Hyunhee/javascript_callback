// setTimeout(() => {
//   console.log("a");
// }, 0);
// setTimeout(() => {
//   console.log("b");
// }, 1000);
// setTimeout(() => {
//   console.log("c");
// }, 2000);

// Promise.resolve().then(() => {
//   console.log("p");
// });

//  한 번 비동기는 영원한 비동기
//  비동기는 동시의 문제가 아니다. 순서의 문제다.

//  비동기 -> 동기 (불가)
//  콜백이라고 무조건 비동기가 아니고 비동기 콜백만이 비동기다.

//  promise, process.nextTick -> micro, 나머지는 매크로 큐에 들어감.
//  마이크로 태스크큐가 꽉 차있으면 영원히 매크로태스크는 실행이 되지 않음.

// let a = 2;
// setTimeout(() => {
//   a = 5;
//   console.log(a);
// }, 0);

// const p = new Promise((resolve, reject) => {
//   //동기
//   console.log("제일 먼저");
//   setTimeout(() => {
//     a = 5;
//     console.log(a);
//     resolve(a);
//   }, 0);
// });
// // 딴짓 딴짓
// // 딴짓 딴짓
// // 딴짓 딴짓
// console.log("딴짓");
// // 딴짓 딴짓
// // 딴짓 딴짓
// p.then((result) => {
//   console.log("result", result);
//   //return 1;
//   return Promise.resolve(1);
// })
//   .then((result) => {
//     console.log(result); // 1  promise의 resolve값이 return
//     return undefined;
//   })
//   .then((result) => {
//     console.log(result); // undefined
//   })
//   .catch(() => {
//     //에러로 이동
//   })
//   .then(() => {})
//   .catch(() => {
//     //에러로 이동
//   })
//   .finally(() => {});

function delayP(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

//async함수의 동기 부분 끝: 첫 번째 await 전에서 끝
async function a() {
  console.log("2");
  const a = await 1; // await === then
  // const a = await axios.get()
  console.log("4");
  console.log("a", a);
  console.log("hmm");
  await null;
  const b = await Promise.resolve(1); // await: 오른쪽 -> 왼쪽
  console.log("b", b);
  return a + b;
}

//  await 사이의 코드 작성
// Promise.resolve(1) // Promise: 왼쪽 -> 오른쪽 , 위 -> 아래
//   // axios.get()
//   .then((a) => {
//     console.log("a", a);
//     console.log("hmm");
//     return null;
//   })
//   .then(() => {
//     return Promise.resolve(1);
//   })
//   .then((b) => {
//     console.log("b", b);
//     return b;
//   });

console.log("1");
a()
  .then((result) => {
    console.log(result);
  })
  .then((result2) => {
    console.log(result2);
  });

console.log("3");

//  resolve가 호출 됐을 때 then 실행
//  Promise란 실행은 바로 하되 결괏갑을 나중에 원할 때 쓸 수 있는 것
//  실행은 바로 ---> 결괏값이 나올 때는 나중 -> 결괏값을 사용할 때는 더 나중
//  실행은 바로 ---> 결괏값도 거의 바로 쓰고 싶은데 ---> 그 다음에 결괏값이 나오면 ---> then, await, Promise.all 이런 게 결괏값을 기다린 후에 실행된다.

function delayP(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

async function a() {
  await delayP(3000);
  await delayP(6000);
  await delayP(9000);
}
// 토탈 18초

async function b() {
  const p1 = delayP(3000);
  const p2 = delayP(6000);
  await Promise.all([p1, p2]);
  await delayP(9000);
}
// 토탈 15초

new Promise((resolve, reject) => {
  const p1 = delayP(3000);
  const p2 = delayP(6000);
  return Promise.all([p1, p2]);
});

async function c() {
  const a = await 1;
  const b = await 2;
  return a + b;
}

Promise.resolve(1)
  .then((a) => {
    return 2;
  })
  .then((b) => {
    return a + b;
  });
