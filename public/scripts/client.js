/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// const data = [
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
// ];



const createTweetElement = function(tweetData) {
  let $tweet = $(`
    <article class="tweet-container">
      <header>
        <ul class="name-list">
          <li class="name">
            <img src=${tweetData.user.avatars}">
            ${tweetData.user.name}
          </li>
          <li class="handle">${tweetData.user.handle}</li>
        </ul>
      </header>
      <section class="tweet">
        <p>${tweetData.content.text}</p>
        <div class="h_line"></div>
      </section>
      <footer>
        <section class="ago">
          <small>${timeago.format(tweetData.created_at)} </small>
        </section>
        <section class="icons">
        <i class="icons fa-solid fa-flag"></i>
        <i class="icons fa-sharp fa-solid fa-retweet"></i>
        <i class="icons fa-solid fa-heart"></i>
        </section>
      </footer>
    </article>`
  );
  return $tweet;
};

const renderTweets = function(data) {
  // loops through tweets'
  $('.tweet-container').remove();
  data.forEach((tweet) => {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    $('.container').append($tweet);
  });
};

const loadTweets = function() {
  $.ajax(
    '/tweets',
    { method: 'GET' }
  ).then(renderTweets);
};

$(() => {
  const $form = $('#form');
  $form.on("submit", (event) => {
    event.preventDefault();
    const $input = $('#tweet-text').serialize();
    console.log($input);
    const URL = "/tweets"
    $.post(URL, $input);
  });

  loadTweets();
});