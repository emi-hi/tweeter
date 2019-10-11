$(document).ready(() => {
  //count characters while user is typing new tweet, update counter
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
  });

  // extend new tweet form when arrow clicked
  const extendNewTweetButton = document.getElementById("tweetArrow");
  $(extendNewTweetButton).on('click', function () {
    $("#new-tweet-form").slideToggle('slow');
    $("#tweetInput").focus();
  });

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 30) {
      $( "#up-chevron" ).css("visibility", "visible");
      $( "#tweetArrow" ).css("visibility", "hidden");
      $( "#writeTweet" ).css("visibility", "hidden");
    } else {
      $( "#up-chevron" ).css("visibility", "hidden");
      $( "#tweetArrow" ).css("visibility", "visible");
      $( "#writeTweet" ).css("visibility", "visible");
    }
  };

  $('#up-chevron').on('click', function () {
    //scroll to top when arrow clicked!
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    $("#new-tweet-form").slideToggle('slow');
    $("#tweetInput").focus();
  });

});

