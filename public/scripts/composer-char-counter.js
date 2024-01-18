$(document).ready(function() {
  console.log("hello Kai")

let count = 0;

$("#tweet-text").on("keydown", function() {
  const $this = $(this);
  count = $this.val().length;


  let $counter = $this.parent('form').find('.counter')
  $counter.val(140 - count);
  if (count > 140) {
    $counter.css('color', 'red');
  } else {
    $counter.css('color', 'rgb(63, 63, 63)');
  }
});

});
