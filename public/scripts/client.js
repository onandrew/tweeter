/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function () {

  //escape function for invalid user text
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //function using jquery to create tweet using user info
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
      $('#tweets-container').prepend(createTweetElement(tweet));
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

  //hides error message by default
  $(".error-message").hide();

  $('#submitForm').on('submit', function (event) {
    event.preventDefault();

    $(".error-message").slideUp();

    const userInput = $('#tweet-text').val();
    const $textArea = $(this).children('textarea');

    //checks for empty user input
    if (userInput === '' || null) {
      $('.error-message').slideDown();
      $('.error-message').text("Your tweet cannot be blank!")
      return;
    }

    //checks for user entering more than allowed 140 characters
    if (userInput.length > 140) {
      $('.error-message').slideDown().text('Please make sure your tweet is under 140 characters!');
      return;
    }

    $.ajax('/tweets', {
      data: $(this).serialize(),
      method: 'POST',
      success: () => {
        loadTweets();
        $textArea.val(""); // clear textarea
        $('.counter').text('140'); // reset counter to 140
      },
      error: (error) => console.error(error)
    });
  });

  loadTweets();
});
