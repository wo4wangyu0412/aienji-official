var returnTop  = new function(){
    var o = {};
    return o = {
        data:{

        },
        urlhref:function(data){
            data.time=data.time||500;
            var top=parseInt($(data.element).offset().top);
            var headerTop=parseInt($(".header").css("height"));
            top=top-headerTop;
            $('html,body').animate({scrollTop:top},data.time);
        }
    }
}
function u(data){
    data.time=data.time||500;
    var top=parseInt($(data.element).offset().top);
    var headerTop=parseInt($("#header").height());
  
    top=top-headerTop;

    $('html,body').animate({scrollTop:top},data.time); 
}