/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function () {

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweetObject) {
    const newTweet = ` <article class= "tweet"> 
    <header>
      <div>
        <img src = ${tweetObject.user.avatars}/>
        <span> ${escape(tweetObject.user.name)} </span>
      </div>
      <p>${escape(tweetObject.user.handle)}</p>
    </header>
      <div>
        <p>${escape(tweetObject.content.text)}</p>
      </div>
    <footer>
      <p class="tweet-date">${timeago.format(tweetObject.created_at)}</p>
      <div> 
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>  
    </footer>
    </article>
    `
    return newTweet;
  };

  const renderTweets = function (tweetsArray) {
    for (let tweet of tweetsArray) {
      $('#tweets-container').append(createTweetElement(tweet));
    }
  }

  const loadTweets = function () {
    $.ajax('/tweets', {
      method: 'GET',
      dataType: 'JSON',
      success: tweets => renderTweets(tweets),
      error: (error) => console.error(error)
    });
  };

  $(".error-message").hide();

  $('#submitForm').on('submit', function (event) {
    event.preventDefault();

    $(".error-message").slideUp();

    const userInput = $('#tweet-text').val();

    if (userInput === '' || null) {
      $('.error-message').slideDown();
      $('.error-message').text("Your tweet cannot be blank!")
      return;
    }

    if (userInput.length > 140) {
      $('.error-message').slideDown().text('Please make sure your tweet is under 140 characters!');
      return;
    }

    $.ajax('/tweets', {
      data: $(this).serialize(),
      method: 'POST',
      success: () => {
        loadTweets();
        $textArea.val(''); // clear textarea
        $('.counter').text('140'); // reset counter to 140
      },
      error: (error) => console.error(error)
    });
  });

  loadTweets();
});
