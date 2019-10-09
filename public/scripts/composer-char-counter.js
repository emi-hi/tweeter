$(document).ready(() => {
  const inputTweet = document.getElementById('tweetInput');
  const maxTweetLength = 140;
  const negativeValue = "negative-value"
  $(inputTweet).keyup(function () {
    const countLength = maxTweetLength - this.value.length;
    //look into siblings
    $(counter).text(countLength);
    if (countLength < 0) {
       $(counter).addClass(negativeValue);
    } else {
      $(counter).removeClass(negativeValue);
    }
  })
})