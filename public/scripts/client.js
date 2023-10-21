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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
$(document).ready(function() {
const renderTweets = function (tweetsArray) {
  for (let tweet of tweetsArray) {
    $('#tweet-container').append(createTweetElement(tweet));
  }
}
const createTweetElement = function (tweetObject) {
  const newTweet = ` <article> 
  <header class = "newtweetHead">
    <div>
      <img src = ${tweetObject.user.avatars}/>
    </div>
    <div>
      <span> ${tweetObject.user.name} </span>
    <div>
      <span>${tweetObject.user.handle}</span>
    </div>
  </header>
    <div>
      <span>${tweetObject.content.text}</span>
    </div>
  <footer class = "newTweetFoot">
    <div>
      <span>${tweetObject.created_at}</span>
    </div>
    <div> 
      <span> <i class="fas fa-flag"> </i> <i class="fas fa-retweet"> </i> <i class="fas fa-heart"> </i> </span>
    </div>  
  </footer>
  </article>
  `
  return newTweet;
};

renderTweets(data);


const submitTweet = $('#submitForm');
submitTweet.on('submit', function(event) {
  const data = $('#submitForm').serialize();
  event.preventDefault();
  $.ajax(data, {method: 'POST'})
});
});