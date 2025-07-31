// 검색버튼 무시 바로 나오는 영화 확인
$.get("../json/youtube.json").done(function (data) {
  $("#results").html(
    `
            <p class="title">영화제목${data.result.title}</p>
            <p class="info">영화설명${data.result.description}</p>
            <img src="${data.result.thumbnail}"/>
            <p class="url-text">영화주소${data.result.url}</p>
            `
  );
});

// 검색 버튼 기능
$.get("../json/youtube.json").done(function (data) {
  const search = "#searchInput".val();
  if (data.result.title == search) {
    $("#results").html(
      `
        <p class="title">영화제목${data.result.title}</p>
            <p class="info">영화설명${data.result.description}</p>
            <img src="${data.result.thumbnail}"/>
            <p class="url-text">영화주소${data.result.url}</p>
        `
    );
  }
});
