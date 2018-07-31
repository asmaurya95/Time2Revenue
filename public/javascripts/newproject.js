$(document).ready(function(){
    $("#project_details").click(function(){
        $("#content1").slideToggle("slow");
    });

    $("#ttr_details").click(function(){
        $("#content2").slideToggle("slow");
    });

	$("#effort_details").click(function(){
        $("#content3").slideToggle("slow");
    });

});

$('#project_details').click(function(e){
  var $target = $('html,body');
  $target.animate({scrollTop: $target.height()}, 700);
});

$('#ttr_details').click(function(e){
  var $target = $('html,body');
  $target.animate({scrollTop: $target.height()}, 700);
});

$('#effort_details').click(function(e){
  var $target = $('html,body');
  $target.animate({scrollTop: $target.height()}, 700);
});
