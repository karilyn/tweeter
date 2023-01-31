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
  const escape = function(str) {
    let p = document.createElement("p.tweet");
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  };
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
        <p>${escape(tweetData.content.text)}</p>
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
  data.reverse();
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
  $form.submit((event) => {
    event.preventDefault();
    const $input = $('#tweet-text');
    if (!$input.val()) {
      $("#error-empty").text("Whoops! Your tweet can't be blank").addClass("action").slideDown("slow");
    } else if ($input.val().length > 140) {
      $("#error-length").text("Whoops! Your tweet must 140 characters or fewer").addClass("action").slideDown("slow");
    } else {
      $("#error-length").slideUp();
      $("#error-empty").slideUp();
      console.log($input);
      const URL = "/tweets"
      $.post(URL, $input.serialize(), (data) => {
        $input.val('');
        loadTweets();
      });
    }

  });

  loadTweets();

  $('.nav-right').mouseover(() => {
    $('#write-new-tweet-i').addClass('fa-bounce');
  });

  $('.nav-right').mouseout(() => {
    $('#write-new-tweet-i').removeClass('fa-bounce');
  });

  $('button.compose').click((event) => {
    event.preventDefault();
    $form.slideToggle();
  });

  const btn = $('#up-to-top');
  $(window).scroll(() => {
    // if page is scrolled down more than 300px, display button, otherwise hide
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function(e) {
    e.preventDefault();
    $('html, main').animate({
        scrollTop: 0
      },
      '300',
      () => {
        $form.slideDown();
        $('#tweet-text').focus();
      }
    );
  });

})