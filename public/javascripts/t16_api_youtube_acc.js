"use strict";

$(document).ready(function()
{
    var $show = $("#js_t16_show_res"),
        $res = $("#js_t16_original_res");
    $show.on('click', function(e){
        e.preventDefault();
        if($show.hasClass("js_t16_active")){
            $show.removeClass("js_t16_active");
            $res.slideUp("slow");
        }else{
            $show.addClass("js_t16_active");
            $res.slideDown("slow");
        }
    })
});