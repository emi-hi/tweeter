$(document).ready(() => {

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  const createTweetElement = function(tweetObj) {

    // const safeHTML = `<p>${escape(tweetObj.content.text)}</p>`;
    const $tweet = $("<article>").addClass("tweet");
    const d = new Date(tweetObj.created_at);
    // const today = new Date();
    // const todayTime = today.getTime()
    // ms = Math.abs(todayTime - d)
    // let days = (ms / (60*60*24*1000))
    // let timeSinceTweet = '';
    // //dates logic..
    // if (days < 30) {
    //   timeSinceTweet += days + ' days ago';
    // } else if (days > 30 && days <= 45) {
    //   timeSinceTweet = '1 month ago';
    // } else if (days > 45 && days <= 365) {
    //   timeSinceTweet = Math.round(days/12) + ' months ago';
    // } else {
    //   timeSinceTweet = Math.round(days/365) + ' years ago';
    // }
    const markup = `
        <header>
          <img src=${tweetObj.user.avatars}> 
          <p>${tweetObj.user.name}</p>
          <h4>${tweetObj.user.handle}</h4>
        </header>
        <p>${escape(tweetObj.content.text)}</p>
        <footer>
          <p> ${d}
              <a>🚩🔁❤️</a>
          </p>
        </footer>
      `
      return $tweet.append(markup);
  }

  const renderTweets = function(tweetArray) {
    for (let tweet of tweetArray) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  }

  // get the tweets from the server and render
  const loadTweets = function() {
    $.ajax({url: '/tweets', type: 'GET'})
      .then(function(moreTweets) {
        renderTweets(moreTweets)
      })
  }


  const isTweetValid = function(theInput) {
    const tweetLimit = 140;
     //if the tweet is too short or long, reject and send an alert to the user
    if ( theInput === '' | theInput === null){
      return("Error: ⚠️ Please enter a tweet! ⚠️")
    } else if (theInput.length > tweetLimit) {
      return("Error: ⚠️ please shorten your tweet, the max is 140 characters!  ⚠️")
    } else {
      return true
    }
  }

  // when the button is clicked, check the text input and if it's good, send it to the server! then reset the form and load tweets.
  $(".form-inline").on('submit', function () {
    event.preventDefault()
    
    const $form = $(this);
    const $input = $form.find("textarea");
    const $inputSerialize = $form.serialize();
    $alert = $form.find("div.alert")
    $alert.text('')
    // $alert.removeClass('is-visible')
    $alert.slideDown()
    setTimeout(() => {
      if (isTweetValid($input.val()) === true) {
        $.ajax({url: '/tweets', type: 'POST', data: $inputSerialize})
          .then((res) => {
            $form.trigger("reset");
            $(this).siblings("span.counter").text(140);
            (loadTweets())
          })
      } else {
        $alert.text(isTweetValid($input.val()));
        $alert.slideDown()
        // $alert.addClass('is-visible')//(isTweetValid($input.val()));
      }
    }, 200);
 
  });


  const extendNewTweetButton = document.getElementById("tweetArrow");
  $(extendNewTweetButton).on('click', function () {
    $("#new-tweet-form").slideToggle('slow')
    $("#tweetInput").focus()
  })

  loadTweets()
});


