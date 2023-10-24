$(document).ready(function() {
  $('#tweet-text').keyup(function() {
    const tweetLimit = 140;
    let currentInputLength = $(this).val().length;
    let charsRemaining = tweetLimit - currentInputLength;
    $(this).next().find('.counter').text(charsRemaining);
    if (charsRemaining < 0) {
      $(this).next().find('.counter').css("color", "red");
    }
  });
});