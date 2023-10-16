$(document).ready(function() {
  $('textarea').keyup(function() {
    const tweetLimit = 140;
    let currentInputLength = $(this).val().length;
    let charsRemaining = tweetLimit - currentInputLength;
    $(this).nextAll().text(charsRemaining);
    if (charsRemaining < 0) {
      $(this).nextAll().css("color", "red");
    }
  });
});