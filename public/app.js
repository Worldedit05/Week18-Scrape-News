$( document ).ready(function(){
  $(".button-collapse").sideNav();

  $.getJSON("/pictures", function (data) {

    for ( var key in data ) {

      var validImg = data[key].img;

      if ( validImg.substring(0,4) !== 'http' || validImg.includes("imgur.com/gallery")) {
        console.log("Not valid");
      }
      else {
        $('#pictures').prepend('<div class="row"><div class="col s12 m12"><div class="card blue-grey darken-1"><div class="card-image"><img data-id=' + data[key]._id + ' src="'+ data[key].img +'" class="activator responsive-img" alt=""></div><div class="card-reveal"><span class="card-title"><small>'+ data[key].name + '</small><i class="material-icons right">close</i></span><p id=' + data[key]._id + '></p></div></div></div></div>');
      }
    }
  });
});

$( document ).on("click", "img", function () {

  var thisId = $(this).attr("data-id");

  $("#" + thisId).empty();

  $.ajax({
    method: "GET",
    url: "/pictures/" + thisId
  })
  .done(function (data) {

    $("#" + thisId).append("<div class='input-field'><input id='titleinput' name='title' type='text' ><label for='titleinput'>Subject</label></div>");

    $("#" + thisId).append("<div class='input-field'><textarea class='materialize-textarea' id='bodyinput' name='body' type='text'></textarea><label for='bodyinput'>Comment</label></div>");

    $("#" + thisId).append("<a class='waves-effect waves-light btn' data-id='" + data._id + "' id='savenote'>Save</a>");

    if (data.comment) {
      // Place the title of the note in the title input
      $("#titleinput").val(data.comment.title);
      // Place the body of the note in the body textarea
      $("#bodyinput").val(data.comment.body);
    }

  });

});
