$(function(){
    $('.main .main_cont').eq(0).stop().show()
    $('.main .nav li').click(function(index) {
        $(this).addClass('on').siblings().removeClass('on');
        var index = $(this).index();
        $('.main .main_cont').eq(index).stop().show().siblings().stop().hide();
    });

})