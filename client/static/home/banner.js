$(function(){
    var $ul = $('.news .banner04 ul');
    var $li = $('.news .banner04 ul li');
    var $leftBtn = $('.news .banner04 .prev');
    var $rightBtn = $('.news .banner04 .next');
    var liW =$li.width()
    var num = 0;
    var liL = $li.length;
    var Eq = $li.width();
    var lengW =$li.length+1;
    //var ulW = $li.width()*lengW;
    var timer = null;
    var key = 0;
    var speed = 5500;//定时器时间
    var navC =" <div class='child'></div>";
    //var liHtml ="<li><a href=''><div class='info'><h5>成天然气点供设备</h5><p>INTO GAS POINT FOR EQUIPMENT</p></div><img src='images/index/4.jpg'/></a></li>";
    //$ul.append(liHtml);
    //$ul.width(ulW);
    $('.news .banner04 ul li').eq(0).css({
        'zIndex': '5'
    });
    function qiehuan(index){
        $li.eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);
        $li.eq(index).addClass('on').siblings().removeClass('on');
        num = index;
    }
    
    // 定时器
    var Fn = function(){
        num++;
        if(num >= liL){
            num = 0;
            qiehuan(num);
        }else{
            qiehuan(num);
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
    
})