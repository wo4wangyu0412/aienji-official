$(function(){
    var $ul = $('.banner04 ul');
    var $li = $('.banner04 ul li');
    var $leftBtn = $('.banner04 .prev');
    var $rightBtn = $('.banner04 .next');
    var liW =$li.width()
    var num = 0;
    var liL = $li.length;
    var Eq = $li.width();
    var lengW =$li.length+1;
    //var ulW = $li.width()*lengW;
    var timer = null;
    //var key = 0;
    var speed = 5500;//定时器时间
    var navC =" <div class='child'></div>";
    //var liHtml ="<li><a href=''><div class='info'><h5>成天然气点供设备</h5><p>INTO GAS POINT FOR EQUIPMENT</p></div><img src='images/index/4.jpg'/></a></li>";
    //$ul.append(liHtml);
    //$ul.width(ulW);
    $('.banner04 ul li').eq(0).css({
        'zIndex': '5'
    });
    function qiehuan(index){
        $li.eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);
        $li.eq(index).addClass('on').siblings().removeClass('on');
        $('.banner04 .banner04_nav .child').eq(num).addClass('in');
        num = index;
    }
    //alert(liL)
   // $('.banner04 .banner04_nav').append(s);
    var navLi = liL-1
    for (var e=0;e<=navLi;e++){
        //alert(liL);
        $('.banner04 .banner04_nav').append(navC);
    }
    $('.banner04 .banner04_nav .child').eq(0).addClass('in');
    $('.banner04 .banner04_nav').on('click', '.child', function(index) {
        $('.banner04 .banner04_nav .child').removeClass('in');
        $(this).addClass('in');
        var navL = $(this).index();
        $li.eq(navL).stop().fadeIn(500).siblings().stop().fadeOut(500);
        $li.eq(navL).addClass('on').siblings().removeClass('on');
    });
    // 定时器
    var Fn = function(){
        num++;
        if(num >= liL){
            num = 0;
            qiehuan(num);
            $('.banner04 .banner04_nav .child').eq(num).addClass('in').siblings().removeClass('in');
        }else{
            qiehuan(num);
            $('.banner04 .banner04_nav .child').eq(num).addClass('in').siblings().removeClass('in');
        }
        
    }
    timer=setInterval(Fn,speed);
    // 上一个
    $rightBtn.click(function(event) {
        num--;
        //clearInterval(timer);
        if(num <= 0){
            qiehuan(num);
        }else{
            qiehuan(num);
        } 
        if(num == -liL){
            num=-1;
        }
    });
    // 下一个
    $leftBtn.click(function(event) {
        num++;
        //clearInterval(timer);
        if(num >= liL){
            num=0;
            qiehuan(num);
        }else{
            qiehuan(num);
        }
    });
    var imgL = $('.honor .banner04 ul li .imgBox').length;
    $('.honor .banner04 ul li .imgBox').each(function(indexs, el) {
        $(this).click(function(event) {
            $('.alertBox').show();
            $('.banner05 ul li').eq(indexs).show();
            $('.banner05 ul li').eq(indexs).css({
                'zIndex': '5'
            });
            key = indexs;
            //alert(indexs)
        });
        key = indexs;

        //n = indexs
    });
    $('.alertBox .banner05 .next0').click(function(event) {
        key++;
        if(key >= imgL){
            
          key=0;
            //alert(key)
            $('.alertBox .banner05 ul li').eq(key).stop().fadeIn(500).siblings().stop().fadeOut(500);
        }else{
            $('.alertBox .banner05 ul li').eq(key).stop().fadeIn(500).siblings().stop().fadeOut(500);
        }
    });
    $('.alertBox .banner05 .prev0').click(function(event) {
        
            key--;
            if(key <= 0){
                $('.alertBox .banner05 ul li').eq(key).stop().fadeIn(500).siblings().stop().fadeOut(500);
            }else{
                $('.alertBox .banner05 ul li').eq(key).stop().fadeIn(500).siblings().stop().fadeOut(500);
            } 
            if(key == -imgL){
                key=-1;
            }
        });
    $('.alertBox .close').click(function(event) {
        $('.alertBox').stop().hide();
        $('.banner05 ul li').css({
                'zIndex': '0'
            });
    });
    
})