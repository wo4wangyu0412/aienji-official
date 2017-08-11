$(function(){
    // productClass
    $('.main .productClass .content h6').click(function(event) {
        $('.main .productClass .content h6').removeClass('current');
        $(this).addClass('current');
        $(this).siblings().stop().slideToggle();
        $('.main .productClass .content h6').not($(this)).siblings().stop().slideUp();
    });
    // $('.main .productClass .content h6').eq(0).addClass('current');
    // $('.main .productClass .content .childMian').eq(0).stop().slideDown();
    // product 
    $('.main .product li').hover(function() {
        $(this).toggleClass('in');
        $(this).find('.hover').toggleClass('on');
    }, function() {
        $(this).removeClass('in');
        $(this).find('.hover').toggleClass('on');
    });
    
})