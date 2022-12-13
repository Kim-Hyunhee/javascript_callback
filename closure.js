//  클로저 문제 -> 스포크, 비동기, var(쓰레기)
//  클로저가 문제다 X
//  클로저를 사용해서 해결하는 문제
//  for문(반복문)관 비동기를 함께 사용하면 종종 발생

//  문제: var과 for 과 비동기의 환상의 콜라보
//  해결법1: var 유지 -> 즉시 실행 함수로 클로저 생성
//  해결법2: var -> let

// 문제
function a() {
  for (var i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}

a();

//  function a 스코프는 1개고, for문의 스코프는 5개
//  a스코프에서 i는 0->5가 되는 거고, for 문의 스코프 5개에서 i는 각각 0,1,2,3,4

//  해결법1 => 클로저 통해서 해결
//  클로저: 함수와 함수 외부에 있는 변수와의 관계 => function j 와 for문의 var i와의 관계
function a() {
  for (var i = 0; i < 5; i++) {
    (function (j) {
      setTimeout(() => {
        console.log(j);
      }, i * 1000);
    })(i);
  }
}

a();

// 해결법2
function a() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}

a();
