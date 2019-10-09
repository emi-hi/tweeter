$(document).ready(() => {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


  const createTweetElement = function(tweetObj) {
    const $tweet = $("<article>").addClass("tweet");
    const d = new Date(tweetObj.created_at);
    const today = new Date();
    const todayTime = today.getTime()
    ms = Math.abs(todayTime - d)
    let days = (ms / (60*60*24*1000))
    console.log(days)
    let timeSinceTweet = '';
    //dates logic..
    if (days < 14) {
      timeSinceTweet += days + ' days ago';
    } else if (days >= 14 && days <= 30) {
      timeSinceTweet += days/7 + ' weeks ago';
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

  
renderTweets(data)
});
