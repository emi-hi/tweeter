$(document).ready(() => {
  const inputTweet = document.getElementById('tweetInput');
  $(inputTweet).keyup(function () {
    const countLength = 140 - this.value.length;
    $(counter).text(countLength)
    if (countLength < 0) {
       $(counter).addClass("negativeValue");
    } else {
      $(counter).removeClass("negativeValue");
    }
  })
})