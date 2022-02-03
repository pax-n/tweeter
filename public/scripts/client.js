/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  // Test / driver code (temporary). Eventually will get this from the server.
  // const tweetData = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  //
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //html layout for new tweets from ajax
  const createTweetElement = function(tweet) {
    let $tweet = `
    <article class="tweet">
      <header>
        <span class="profile">
          <img src="${escape(tweet.user.avatars)}">
          <span>${escape(tweet.user.name)}</span> 
        </span>
        <span class="user">${escape(tweet.user.handle)}</span>
      </header>
      <p class="words">${escape(tweet.content.text)}</p>
      <footer>
        <span>${escape(timeago.format(tweet.created_at))}</span>
        <span class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart">'</i>
        </span>
      </footer>
    </article>
    `;
    return $tweet;
  };

  //renders the tweet onto the page
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  //asynchronous http request (get) to retrieve data from fake server (/tweets).
  const loadTweets = function () {
    $.ajax('/tweets', {method: 'GET'})
    .then(function (tweets) {
      // console.log('Success: ', tweets);
      renderTweets(tweets);
    });
  };

  //hides warning header from loading up on main page
  $("#warning").hide();

  //submit function for button
  $( "#submit" ).submit(function( event ) {
    event.preventDefault();
    // const param = $(this).serialize();
    // console.log(param);

    let text = $("form").find("textarea").val();

    //if characters in text input exceed 140 characters, display message
    if (text.length > 140) {
      return $("#warning").text("Characters exceeding the max LIMIT!").slideDown(400);
      //if no characters or only spaces are entered, display message
    } else if (text.length === null || text.length === 0 || text.trim() === "") {
      return $("#warning").text("Tweet cannot be EMPTY!").slideDown(400);
    } else {
      //will display new tweet without refreshing home page
      $.ajax({
        url: "/tweets",
        data: $(this).serialize(), 
        method: 'post',
        success: function() {
          $("form").find("textarea").val('');
          loadTweets();
        }
      });
      //hides warning header if the header was displayed previously
      $("#warning").hide();
    }
  });

  loadTweets();
});