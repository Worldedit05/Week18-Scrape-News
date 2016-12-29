$( document ).ready(function(){
  $(".button-collapse").sideNav();

  $('.modal').modal();

  document.getElementById("getData").addEventListener("click", function(event){
    event.preventDefault();
    $.ajax({
      method: "GET",
      url: "/getdata"
    })
    .done(function (data) {
      Materialize.toast('Data Gathering Complete. Your page will now reload', 4000,'',function(){
        window.location.reload();
      });

    });
  });

  $.getJSON("/pictures", function (data) {

    for ( var key in data ) {

      var validImg = data[key].img;

      if ( validImg.substring(0,4) !== 'http' || validImg.includes("imgur.com/gallery") || validImg.includes("flickr.com/photos") ) {
        console.log("Not valid");
      }
      else {
        $('#pictures').prepend('<div class="row"><div class="col s12 m12"><div class="card blue-grey darken-1"><div class="card-image"><a href="#modal1"><img data-id=' + data[key]._id + ' src="'+ data[key].img +'" class="responsive-img" alt=""></a></div></div></div></div>');
      }
    }
  });
});

$( document ).on("click", "img", function () {

  var thisId = $(this).attr("data-id");

  console.log(thisId);

  $.ajax({
    method: "GET",
    url: "/pictures/" + thisId
  })
  .done(function (data) {
    console.log(data);

    $('#modalBody').html("<h4>"+data.name+"</h4><div class='input-field'><input id='titleinput' name='title' type='text' ><label for='titleinput'>Comment Title</label></div>");

    $('#modalBody').append("<div class='input-field'><textarea class='materialize-textarea' id='bodyinput' name='body' type='text'></textarea><label for='bodyinput'>Comment</label></div>");

    $('#modalFooter').html("<a class='waves-effect waves-light btn' data-id='" + data._id + "' id='savenote'>Save</a>");

    if (data.note) {

      $("label").addClass("active");

      $("#titleinput").val(data.note.title);

      $("#bodyinput").val(data.note.body);
    }

  });

});

$(document).on("click", "#savenote", function() {

  var thisId = $(this).attr("data-id");

  console.log(thisId);

  $.ajax({
    method: "POST",
    url: "/pictures/" + thisId,
    data: {
      title: $("#titleinput").val().trim(),
      body: $("#bodyinput").val().trim()
    }
  })
  .done(function (data) {
    console.log(data);

    $('#modal1').modal('close');

  });

});
