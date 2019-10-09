$(document).ready(() => {
  const inputTweet = document.getElementById('tweetInput');
  const maxTweetLength = 140;
  const negativeValue = "negative-value"
  $(inputTweet).keyup(function () {
    const countLength = maxTweetLength - this.value.length;
    theCounter = $(this).siblings("span.counter").text(countLength)
    if (countLength < 0) {
      theCounter.addClass(negativeValue);
    } else {
      theCounter.removeClass(negativeValue);
    }
  })
})