//jQuery 이벤트 처리와
// 기능명칭으로 분류하여 기능 호출하기
$(function () {
  $("#btn1").click(문제1번기능);
  $("#btn2").click(userInfo);
  $("#btn3").click(getRandom);
  $("#btn4").click(getComments);
  $("#btn5").click(errorFn);
  $("#btn6").click(getPosts);
  $("#btn7").click(userList);
  $("#btn8").click(searchUser);
  $("#btn9").click(selectAlbum);
});

// 문제 1 : 기본텍스트 데이터 가져오기
// https://jsonplaceholder.typicode.com/posts/1
function 문제1번기능() {
  $.get(
    "https://jsonplaceholder.typicode.com/posts/1",
    // url 주소를 가져오는데 성공!
    function (data) {
      $("#result1").html(
        `
            <div class="success">
                <strong>게시물제목 : </strong>${data.title}
                // 게시물 내용 body 가져오기
            </div>
        `
      );
    }
  );
}

// 문제 2 : 사용자 정보 표시하기
// https://jsonplaceholder.typicode.com/users
// https://jsonplaceholder.typicode.com/users/{userId}
function userInfo() {
  const ui = $("#userId").val(); //사용자가 작성한 값

  $.get(`https://jsonplaceholder.typicode.com/users/${ui}`)
    // 1. 데이터를 무사히 가져오는 것을 성공
    .done(function (data) {
      // 데이터 가져올 수 있도록 접속하는 데 성공 !

      if (!data.id || !data) {
        $("#result2").html(
          '<div class="error">해당 사용자를 찾을 수 없습니다.</div>'
        );
        return; // 데이터가 없으므로 function 아래 기능을 사용하지 못하도록 돌려보내기
      }

      $("#result2").html(
        `
            <div class="success">
                <strong>이름 : </strong>${data.name}<br>
                <strong>이메일 : </strong>${data.email}<br>
                <strong>전화번호 : </strong>${data.phone}<br>
            </div>
            `
      );
    })
    // 2. 아예 주소로 접근 자체가 불가능한 에러 상태일 때
    .fail(function () {
      // url 접근 자체가 불가능 한 상황
      $("#result2").html(
        `<div class="error">
            해당 사용자를 찾을 수 없습니다. (404 error 발생)
            주소 자체 접속이 안되는 상황
            </div>`
      );
    });
}

// 문제 3 : 랜덤 명언 가져오기
function getRandom() {
  // 1. 번 get 이용해서 데이터 가져올 주소 설정
  // https://api.quotable.io/random
  // http://api.quotable.io/random
  $.get("https://api.quotable.io/random")
    .done(function (data) {
      //데이터 가져오는데 문제가 없을 경우
      $("#result3").html(
        `
        <div class="success">
        <blockquote>${data.content}</blockquote>
        <strong> ${data.author}</strong>
        </div>
        `
      );
    })
    .fail(
      //데이터 주소 접속 실패했을 경우

      $("#result3").html(
        `
            <div class="error">
            명언을 가져오는데 실패했습니다.
            </div>
        `
      )
    );
}

// 문제 4 : 댓글 .length 개를 성공적으로 가져왔다 띄워주기
// https://jsonplaceholder.typicode.com/posts/1/comments
function getComments() {
  $.get("https://jsonplaceholder.typicode.com/posts/1/comments")
    .done(function (data) {
      console.log(data);
      $("#result4").html(
        `
                <div class="success">
                    댓글 ${data.length}  개 를 성공적으로 불러왔습니다.<br>
                    첫번째 댓글 : ${data[0].body} 
                </div>
                `
      );
    })
    .fail(function () {
      $("#result4").html(
        `
            <div class="error">
            댓글 가져오는데 실패했습니다.
            </div>
        `
      );
    });
}

// 문제 5 : 에러 처리하기
// https://jsonplaceholder.typicode.com/posts/999999
function errorFn() {
  $.get("https://jsonplaceholder.typicode.com/posts/999999")
    .done(function (data) {
      $("#result5").html(
        `
                <div class="success">
                    데이터를 성공적으로 가져왔습니다.
                </div>
                `
      );
    })
    .fail(
      // error 가 발생했을 때도 매개변수 파라미터 자리에 data 라는
      // 변수이름을 사용해도 되지만 개발자간의 규칙으로
      // err 나 xhr 과 같은 명칭을 사용해주는 것이 바람직함
      function (xhr) {
        $("#result5").html(
          `
        <div class = "error">
            에러 발생 ! <br>
            <strong>상태 코드 : </strong>${xhr.status}<br>
            <strong>에러 메세지 : </strong>${xhr.statusText}<br>

        </div>
        `
        );
      }
    );
}

// 문제 6: 게시물 5개 가져오기
// https://jsonplaceholder.typicode.com/posts?_limit=5
function getPosts() {
  $.get("https://jsonplaceholder.typicode.com/posts?_limit=5").done(function (
    data
  ) {
    $("#result6").html(
      // data 가 배열 = 목록 = 리스트 형태로 다수 존재할 경우
      // data.map() 배열형태를 하나씩 꺼내서 나열하는 메서드 사용
      data.map((i) => `<p><strong>${i.title}</strong></p>`)
    );
  });
}

// 문제 7 : 유저 목록 모두 조회하기
// https://jsonplaceholder.typicode.com/users
function userList() {
  $.get("https://jsonplaceholder.typicode.com/users").done(
    // 데이터 가져오기 성공했을 경우
    // data.map 을 활용해서 모든 유저 목록 확인
    // result7.html (``) 내부에 데이터를 확인
    // map 내부에서 변수이름은 i 대신 user 사용해서
    // <p>유저닉네임 : ${user.   }</p>
    // <p>유저이메일 : ${user.   }</p>

    function (data) {
      $("#result7").html(
        data.map(
          (user) =>
            `
            <p>유저닉네임 : ${user.username}</p>
             <p>유저이메일 : ${user.email}</p>
            `
        )
      );
    }
  );
}

// 문제 8 : 검색 기능 구현하기
//https://jsonplaceholder.typicode.com/users
function searchUser() {
  // 검색된 사용자의 val 값을 가져오기
  const searchName = $("#searchName").val();
  /*
filter()
배열 = 목록 = 리스트에서 조건에 맞는 것들만 골라내는 기능
배열.filter(조건함수)

data                     .     filter(      (user) =>                                 user.name == searchName)
url에서 가져온 데이터들   에서   걸러낼게요    하나씩 data를 꺼내서 user 변수이름으로 확인  user에서 name과  소비자가 검색한 이름과 일치하는 것들만

user 라는 변수이름에 담아둘게요.

data                                    : url 에서 가져온 데이터를 담고있는 변수이름
    .filter(                            : data에서 가져온 데이터들을 걸러내는 작업 진행
        (user) =>                       : 우선은 data = user 서로 가지고있는 리스트가 동일하지만
                                        : 추후 소비자가 찾는 이름과 user내에서 name 키로 일치하는 값만
                                        : user 변수이름에 담아놓기 설정
                user.name == searchName
)
*/
  $.get("https://jsonplaceholder.typicode.com/users").done(function (data) {
    $("#result8").html(
      data
        .filter((user) => user.name == searchName)
        .map(
          (user) => `
        <p>${user.name}</p>
        <p>${user.email}</p>
        `
        )
    );
  });
}

// 문제 9 : 선택된 항목에 따른 데이터 가져오기
// https://jsonplaceholder.typicode.com/albums/{albumId}/photos?_limit=3

function selectAlbum() {
  const albumId = $("#albumId").val(); // 사용자가 선택한 value 값 가져오기
  $.get(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_limit=3`
  ).done(function (data) {
    $("#result9").html(
      // data.map 형태로 map 내부 변수이름 photo 를 이용해서
      // select 선택을 진행할 때 filter 를 사용해라 를 만날 수 있음
      // 주소값에서 작성된 모든 데이터를 조회할 때는
      // filter  를 굳이 사용하지 않아도 됨!!!!
      data.map(
        (photo) => `
                 <strong> ${photo.title}</strong >
                 <p> ${photo.url}</p>
                `
      )
      // title url 을
      //  <strong> ${ title    }</strong >
      // <p> ${ url    }</p>형태로 가져오기
    );
  });
}
