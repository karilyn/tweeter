const createTweetElement = function (tweetData) {
  const escape = function (str) {
    const p = document.createElement('p.tweet');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  };

  const $tweet = $(`
    <article class='tweet-container'>
      <header>
        <ul class='name-list'>
          <li class='name'>
            <img src=${tweetData.user.avatars}'>
            ${tweetData.user.name}
          </li>
          <li class='handle'>${tweetData.user.handle}</li>
        </ul>
      </header>
      <section class='tweet'>
        <p>${escape(tweetData.content.text)}</p>
        <div class='h_line'></div>
      </section>
      <footer>
        <section class='ago'>
          <small>${timeago.format(tweetData.created_at)} </small>
        </section>
        <section class='icons'>
        <i class='icons fa-solid fa-flag'></i>
        <i class='icons fa-sharp fa-solid fa-retweet'></i>
        <i class='icons fa-solid fa-heart'></i>
        </section>
      </footer>
    </article>`
  )
  return $tweet;
};

const renderTweets = function (data) {
  // loops through tweets
  $('.tweet-container').remove();
  data.reverse();
  data.forEach((tweet) => {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    $('.container').append($tweet);
  })
};

const loadTweets = function () {
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
      // slide an error message down if input is not valid
      $('#error-empty').text('Whoops! Your tweet cannot be blank').addClass('action').slideDown('slow');
    } else if ($input.val().length > 140) {
      $('#error-length').text('Whoops! Your tweet must 140 characters or fewer').addClass('action').slideDown('slow');
    } else {
      // remove the errors when they're resolved
      $('#error-length').slideUp();
      $('#error-empty').slideUp();

      const URL = '/tweets'
      $.post(URL, $input.serialize(), (data) => {
        $input.val('');
        loadTweets();
      })
    }
  });

  loadTweets();

  // animate the arrows if either the 'Write a New Tweet' or 'fa-angles-down' are hovered over
  $('.nav-right').hover(() => {
      $('#write-new-tweet-i').addClass('fa-bounce');
    }, () => {
      $('#write-new-tweet-i').removeClass('fa-bounce');
  });

  // slide the new tweet form down when the compose button or fa-angles-down are clicked
  $('button.compose').parent().click((event) => {
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

  btn.on('click', function (event) {
    event.preventDefault();
    // scroll back up to the top when arrow up button is clicked
    $('html, main').animate({
      scrollTop: 0
    },
    '300',
    () => {
      $form.slideDown();
      $('#tweet-text').focus();
      }
    )
  });
});