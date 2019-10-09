$(document).ready(() => {
  // const tweets = document.getElementById("article");
const tweets = jQuery("article");

  $(tweets).mouseover(function () {
    $(tweets).addClass("mouseOn");
    $(tweets.h4).addClass("mouseOn");
  })

  $(tweets).mouseout(function () {
    $(tweets).removeClass("mouseOn")
  })
})