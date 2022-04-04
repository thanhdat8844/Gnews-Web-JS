const apiKey = "19fa9493cd7bd2c3fd8f94918ffd3fbe";
const urlHead = `https://gnews.io/api/v4/top-headlines?country=us&token=${apiKey}`;
$(document).ready(function () {
  searchNews(urlHead);
  $("#search").click(function () {
    $("#search-box").show(300);
    $("#showArea").fadeTo("slow", 0.2);
    $("#head").fadeTo("slow", 0.2);
  });
  $("#close").click(function () {
    $("#search-box").hide(300);
    $("#showArea").fadeTo("slow", 1);
    $("#head").fadeTo("slow", 1);
  });
  $("#Home").click(function () {
    $("#showArea").html("");
    $("#loading-gif").show(300);
    searchNews(urlHead);
    $("#loading-gif").hide(300);
  });
  $("#search-submit").click(function () {
    let searchList = $("#search-keywords").val();
    let searchStart = $("#start").val() + "T00:00:00Z";
    let searchEnd = $("#end").val() + "T00:00:00Z";
    let urlSearch = ``;
    if (searchList == "") {
      alert("Hãy nhập điều bạn muốn tìm kiếm");
    } else if (searchStart == "" && searchEnd == "") {
      urlSearch = `https://gnews.io/api/v4/search?q=${searchList}&token=${apiKey}`;
    } else if (searchStart == "") {
      urlSearch = `https://gnews.io/api/v4/search?q=${searchList}&to=${searchEnd}&token=${apiKey}`;
    } else if (searchEnd == "") {
      urlSearch = `https://gnews.io/api/v4/search?q=${searchList}&from=${searchStart}&token=${apiKey}`;
    } else {
      urlSearch = `https://gnews.io/api/v4/search?q=${searchList}&from=${searchStart}&to=${searchEnd}&token=${apiKey}`;
    }
    $("#showArea").html("");
    $("#loading-gif").show(300);
    searchNews(urlSearch);
    $("#search-box").hide(300);
    $("#showArea").fadeTo("slow", 1);
    $("#head").fadeTo("slow", 1);
    $("#loading-gif").hide(300);
  });
});

function searchNews(urlSearch) {
  fetch(urlSearch)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      data.articles.forEach((article) => {
        let url = article.url;
        let title = article.title;
        let description = article.description;
        let image = article.image;
        let publishedAt = article.publishedAt;
        $("#showArea").append(
          showContent(title, description, url, image, publishedAt)
        );
      });
      function showContent(title, description, url, image, publishedAt) {
        let img =
          '<img class="img-content col-lg-3 col-sm-6 col-md-6 col-xs-12" src=' +
          image +
          " alt=" +
          title +
          ">";
        let link =
          '<a class="url" target="_blank" href=' + url + ">" + title + "</a>";
        let time = '<p class="publishedTime">' + publishedAt + "</p>";
        let content = "<p>" + description + "</p>";
        let div =
          '<div class="article container-fluid">' +
          img +
          '<div class="content col-lg-9 col-sm-6 col-md-6 col-xs-12">' +
          link +
          time +
          content +
          "</div></div><br>";
        return div;
      }
    });
}
