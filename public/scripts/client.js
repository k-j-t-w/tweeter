$(document).ready(function() {

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
      "created_at": 1706135429765
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1706135363149
    }
]

// converts timestamp to a readable string
const timestampToReadable = function(timestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000); //convert to seconds
  const tweetTime = Math.floor(timestamp / 1000); //convert to seconds
  const timeDifference = currentTimestamp - tweetTime;

  if (timeDifference < 60){
    return "just now";
  } else if (timeDifference < 3600){
    const minutesAgo = Math.floor(timeDifference / 60);
        return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
  } else if (timeDifference < 86400) {
     const hoursAgo = Math.floor(timeDifference / 3600);
     return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
  } else {
     const daysAgo = Math.floor(timeDifference / 86400);
     return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
 }

}

const createTweetElement = function (tweetObject) {
const timestamp = timestampToReadable(tweetObject.created_at)
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
      <output>${timestamp}</output>
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
  // console.log(serializedTweet);
  // console.log("In the event handler")
});

renderTweets(data);
});

// http://localhost:8080/tweets - POST (Send a payload of tweet to the Server and say please save this!)

// http://localhost:8080/tweets - GET

