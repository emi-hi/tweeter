$(document).ready(() => {
 // use this to convert inputs from user to 'safe' inputs (no scripts!)
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  } 

  //create tweet article markup
  const createTweetElement = function(tweetObj) {
    const $tweet = $("<article>").addClass("tweet");
    const d = new Date(tweetObj.created_at);
    const timeDiff = moment(d).fromNow(); //using moment js to calculate the time difference! Script imported in index.html
    const markup = `
        <header>
          <img src=${tweetObj.user.avatars}> 
          <p>${tweetObj.user.name}</p>
          <h4>${tweetObj.user.handle}</h4>
        </header>
        <p>${escape(tweetObj.content.text)}</p>
        <footer>
          <p> ${timeDiff}
              <a>🚩🔁❤️</a>
          </p>
        </footer>
      `
      return $tweet.append(markup);
  }

  //add tweet articles to tweet container
  const renderTweets = function(tweetArray) {
    for (let tweet of tweetArray) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  }

  // get the tweets from the server and render
  const loadTweets = function() {
    $.ajax({url: '/tweets', type: 'GET'})
      .then(function(moreTweets) {
        renderTweets(moreTweets);
      })
  }

  //check if tweet is valid
  const isTweetValid = function(theInput) {
    const tweetLimit = 140;
     //if the tweet is too short or long, reject and send an alert to the user
    if ( theInput === '' | theInput === null){
      return("Error: ⚠️ Please enter a tweet! ⚠️");
    } else if (theInput.length > tweetLimit) {
      return("Error: ⚠️ please shorten your tweet, the max is 140 characters!  ⚠️");
    } else {
      return true;
    }
  }

  // when the button is clicked, check the text input and if it's good, send it to the server! then reset the form and load tweets.
  $(".form-inline").on('submit', function () {
    event.preventDefault()
    const $form = $(this);
    const $input = $form.find("textarea");
    const $inputSerialize = $form.serialize();
    $alert = $form.find("div.alert");
    $alert.text('');
    $alert.slideDown();
    setTimeout(() => {
      if (isTweetValid($input.val()) === true) {
        $.ajax({url: '/tweets', type: 'POST', data: $inputSerialize})
          .then((res) => {
            $form.trigger("reset");
            $(this).siblings("span.counter").text(140);
            (loadTweets());
          })
      } else {
        $alert.text(isTweetValid($input.val()));
        $alert.slideDown();
      }
    }, 600);
 
  });


  //scroll to top when arrow clicked!
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  
  loadTweets()
});


