$(document).ready(function(){
    $("#project_details").click(function(){
        $("#content1").slideToggle("slow");
        var $target = $('html,body');
        $target.animate({scrollTop: $target.height()}, 800);
    });

    $("#ttr_details").click(function(){
        $("#content2").slideToggle("slow");
        var $target = $('html,body');
        $target.animate({scrollTop: $target.height()}, 800);
    });

	$("#effort_details").click(function(){
        $("#content3").slideToggle("slow");
        var $target = $('html,body');
        $target.animate({scrollTop: $target.height()}, 800);
  });

  $("#data").click(function(){
        var $target = $('html,body');
        $target.animate({scrollTop: $target.height()}, 800);
  });

});
