$(document).ready(function() {

// converts timestamp to a readable string
// const timestampToReadable = function(timestamp) {
//   const currentTimestamp = Math.floor(Date.now() / 1000); //convert to seconds
//   const tweetTime = Math.floor(timestamp / 1000); //convert to seconds
//   const timeDifference = currentTimestamp - tweetTime;

//   if (timeDifference < 60){
//     return "just now";
//   } else if (timeDifference < 3600){
//     const minutesAgo = Math.floor(timeDifference / 60);
//         return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
//   } else if (timeDifference < 86400) {
//      const hoursAgo = Math.floor(timeDifference / 3600);
//      return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
//   } else {
//      const daysAgo = Math.floor(timeDifference / 86400);
//      return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
//   }

// }

const createTweetElement = function (tweetObject) {
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
  <p class="tweet-body">${tweetObject.content.text}</p>
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

const renderTweets = function(tweetsArray) {
  $('#tweets-container').empty();
  for(const tweet of tweetsArray) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}

// Event listener for form submission
$("#tweet-text-form").on("submit", function(event) {

  // Prevents default form submission
  event.preventDefault();
  // serialize the data
  const serializedTweet = $("#tweet-text-form").serialize();

  // Subit a POST request to the server
  $.ajax({
    method: "POST",
    url: "/tweets",
    data: serializedTweet,
    success: function(result){
      console.log("Tweet was posted successfully");
    },
    error: function(err){
      console.log("There was an error ",err);
    }
  });

});

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
  })

};

loadTweets();
});



