$(document).ready(function() {

let count = 0;

$("#tweet-text").on("input", function() {
  $('.error-long').hide();
  $('.error-empty').hide();

  const $this = $(this);
  count = $("#tweet-text").val().length;
  console.log($("#tweet-text"))

  $("#counter-140").text(140 - count);
  console.log(count)
  if (count > 140) {
    $("#counter-140").css('color', 'red');
  } else {
    $("#counter-140").css('color', 'rgb(63, 63, 63)');
  }
});

});
