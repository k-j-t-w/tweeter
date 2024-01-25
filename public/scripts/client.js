$(document).ready(function() {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetObject) {
    const $tweet = $(`
  <article class="tweet">
  <header>
    <div>
      <img src="${tweetObject.user.avatars}" alt="User Avatar"> 
    </div>
    <div class="user">
      <h3>${tweetObject.user.name}</h3>
      <h3 class="handle">${tweetObject.user.handle}</h3>
    </div>
  </header>
  <p class="tweet-body">${escape(tweetObject.content.text)}</p>
  <footer>
      <output>${timeago.format(tweetObject.created_at)}</output>
      <span>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <div>
          <i class="fa-solid fa-heart"></i>
          <p>1</p>
        </div>
      </span>
  </footer>
</article>
`);
    return $tweet;

  };

  const loadTweets = function() {

    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        console.log("Recieved Tweets: ", data);
        renderTweets(data);
      },
      error: function(error) {
        console.log('Error loading tweets: ', error);
      }
    });

  };

  const renderTweets = function(tweetsArray) {
    $('#tweets-container').empty();
    for (const tweet of tweetsArray) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };

  // Event listener for form submission
  $("#tweet-text-form").on("submit", function(event) {
  // Prevents default form submission
    event.preventDefault();
    // serialize the data
    const serializedTweet = $("#tweet-text-form").serialize();
    //Error handling/ validation
    if (serializedTweet.length > 140) {
      alert("Tweet is to long, please shorten");
    } else if (serializedTweet === null) {
      alert("Cannot post empty Tweet");
    } else {
 

      // Subit a POST request to the server
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: serializedTweet,
        success: function(result) {
          console.log("Tweet was posted successfully");
        },
        error: function(err) {
          console.log("There was an error ",err);
        }
      });
      loadTweets();
      document.getElementById("tweet-text-form").reset();
    }
  });


  loadTweets();
});



