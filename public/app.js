$( document ).ready(function(){
  $(".button-collapse").sideNav();

  $.getJSON("/pictures", function (data) {

    for ( var key in data ) {

      var validImg = data[key].img;

      if ( validImg.substring(0,4) !== 'http' || validImg.includes("imgur.com/gallery")) {
        console.log("Not valid");
      }
      else {
        $('#pictures').prepend('<div class="row"><div class="col s12 m12"><div class="card blue-grey darken-1"><div class="card-image"><img data-id=' + data[key]._id + ' src="'+ data[key].img +'" class="responsive-img" alt=""><span class="card-title">'+ data[key].name + '</span></div></div></div></div>');
      }
    }
  });
});
