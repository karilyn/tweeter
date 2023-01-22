$(document).ready(function() {

  // activate counter to track textarea value
  const $textArea = $("textArea");
  let maxCharLength = 140;


  $textArea.on("input", function(event) {
    // traverse DOM to find counter
    let $counter = $(this).parent().find("output");
    // the counter's value is 140 - the length of textArea
    $counter.val(maxCharLength - $(this).val().length);
    // if the length of textArea is higher than 140
    if ($(this).val().length > maxCharLength) {
      // then add class to $counter
      $counter.addClass("negative-counter");
    } else {
      // if characters are removed and the length of textArea is no longer higher than 140
      $counter.removeClass("negative-counter");
    }
  });
});
