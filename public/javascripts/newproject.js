$(document).ready(function(){
    $("#project_details").click(function(){
        $("#content1").slideToggle("slow");
        var $target = $('html,body');
        $target.animate({scrollTop: $target.height()}, 700);
    });

    $("#ttr_details").click(function(){
        $("#content2").slideToggle("slow");
        var $target = $('html,body');
        $target.animate({scrollTop: $target.height()}, 700);
    });

	$("#effort_details").click(function(){
        $("#content3").slideToggle("slow");
        var $target = $('html,body');
        $target.animate({scrollTop: $target.height()}, 700);
    });

});
