$(function () {
  // 1: 모달 팝업
  $("#openModal").click(function () {
    // HINT: #modalOverlay를 fadeIn(300)으로 나타내세요
    $("#modalOverlay").fadeIn(300);
  });

  $("#closeModal").click(function () {
    // HINT: #modalOverlay를 fadeOut(300)으로 사라지게 하세요
    $("#modalOverlay").fadeOut(300);
  });

  $("#modalOverlay").click(function (e) {
    // HINT: e.target이 자기 자신일 때만 닫기 (이벤트 버블링 방지)
    /*
    modalOverlay  = 모달이 존재하는 전체 화면 배경

    modal-content = 실제 모달 창

    e.target === this : modalOverlay의 배경 영역을 직접 클릭했을 때
    조건이 false 인 경우는 modal-content 나 그 안의 요소를 클릭했을 때

    이벤트 버블링 : 자식 요소에서 발생한 이벤트가 부모 요소로 차례차례 전달되는 현상
    */
    if (e.target === this) {
      $("#modalOverlay").fadeOut();
    }
  });

  // 2 : 탭 메뉴
  $(".tab-btn").click(function () {
    // data-tab 속성값을 가져와서
    const targetTab = $(this).data("tab");
    // 모든 탭 버튼에서 active 클래스를 제거한 후 현재 클릭한 버튼에
    // 만 active 추가
    $(".tab-btn").removeClass("active");
    $(this).addClass("active");
    // 2. 모든 .tab-content를 slideUP하고, 해당 탭만 slideDown
    // 메서드  .slideUp()  .slideDown() 기본 속도 400ms
    $(".tab-content").slideUp();
    $("#" + targetTab).slideDown();
  });

  // 3: 프로그레스 바
  $("#startProgress").click(function () {
    $("#progressBar").animate(
      {
        // 클릭 실행 되면
        // 가로 100% 채우고
        // 2초 후 무언가를 할 것이다.
        // 무언가를 할 것이다와 시간초는 필수가 아님!
        width: "100%",
      },
      1,
      function () {
        // 2000 = 2초 후 실행할 기능
        // 기존에 progressBar 내부에 %만 작성되어있는 텍스트를
        // width 100%로 만들고 나면 텍스트를 100%로 교체
        $("#progressBar").text("100%");
      }
    );

    // #resetProgress 클릭했을 때
    // css(속성명 = "width", 속성값 = "0%") 만들기
    // text("0%")
    $("#resetProgress").click(function () {
      $("#progressBar").css("width", "0%").text("0%");
    });
  });

  // 4: 3D 카드 플립 효과
  $("#flipCard").click(function () {
    $(this).toggleClass("flipped");
  });

  // 5 : 드롭 다운 메뉴
  /*
  .hover()  : 마우스가 요소로 다가왔을 때 메서드(행동 = 기능)
  .active() : 마우스로 요소를 선택했을 때 메서드(행동 = 기능)
  $(선택자).hover(
  // 기능 1번
    function(){
    // 마우스가 요소 위에 올라갔을 때 실행할 기능
    },
  // 기능 2번
    function(){
    // 마우스가 요소에서 벗어났을 때 실행할 기능
    }
  )

  $(선택자).hover(mouseEnter함수, mouseLeave함수);
  
  */
  $(".dropdown").hover(
    function () {
      $("#dropdownMenu").slideDown(200);
    },
    function () {
      $("#dropdownMenu").slideUp(200);
    }
  );
});
