$(document).ready(() => {
  const createTweetElement = function(tweetObj) {
    const $tweet = $("<article>").addClass("tweet");
    const d = new Date(tweetObj.created_at);
    const today = new Date();
    const todayTime = today.getTime()
    ms = Math.abs(todayTime - d)
    let days = (ms / (60*60*24*1000))
    let timeSinceTweet = '';
    //dates logic..
    if (days < 30) {
      timeSinceTweet += days + ' days ago';
    } else if (days > 30 && days <= 45) {
      timeSinceTweet = '1 month ago';
    } else if (days > 45 && days <= 365) {
      timeSinceTweet = Math.round(days/12) + ' months ago';
    } else {
      timeSinceTweet = Math.round(days/365) + ' years ago';
    }
    const markup = `
        <header>
          <img src=${tweetObj.user.avatars}> 
          <p>${tweetObj.user.name}</p>
          <h4>${tweetObj.user.handle}</h4>
        </header>
        <p>${tweetObj.content.text}</p>
        <footer>
          <p> ${timeSinceTweet}
              <a>🚩🔁❤️</a>
          </p>
        </footer>
      `
      return $tweet.append(markup);
  }

  const renderTweets = function(tweetArray) {
    for (let tweet of tweetArray) {
      $('#tweets-container').append(createTweetElement(tweet));
    }
    
  }

  const loadTweets = function() {
    $.ajax({url: '/tweets', type: 'GET'})
      .then(function(moreTweets) {
        renderTweets(moreTweets)
      })
  }
  loadTweets()

  const button = document.getElementById('submitTweet');
  $(button).on('click', function () {
    event.preventDefault()
    const tweetLimit = 140;
    const $inputSerialize = $( this.form ).serialize()
    const theInput = $('textArea#tweetInput').val()
    if( theInput === '' | theInput === null){
      alert("Please enter a tweet!")
    } else if (theInput.length > tweetLimit) {
      alert("please shorten your tweet, the max is 140 characters!")
    } else {
      $.ajax({url: '/tweets', type: 'POST', data: $inputSerialize})
      .then($(this.form).trigger("reset"));
    }
  });

});


