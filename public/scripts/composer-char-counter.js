$(document).ready(function() {
  $("form").find("textarea").keyup(function() {
    let length = $(this).val().length;
    $(this).next().find("output.counter").text(140 - length);
    if (length > 140) {
      $(this).next().find("output.counter").css("color", "red");
    } else {
      $(this).next().find("output.counter").css("color", "#545149");
    }
  })
});