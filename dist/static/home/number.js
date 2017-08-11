$(function(){
        var s = $('.number.in li .num:eq(0)').html();
        var num = 0;
        var timer = null;
        timer = setInterval(function(){ 
        num += 1 ;
        if( num >= 10 ){  
            clearInterval(timer)
        }
        $('.number.in li .num:eq(0)').html(num)
    },380);

        var s0 = $('.number.in li .num:eq(1)').html();
        var num0 = 0;
        var timer0 = null;
        timer0 = setInterval(function(){ 
        num0 += 2 ;
        if( num0 >= 20 ){  
            clearInterval(timer0)
        }
        $('.number.in li .num:eq(1)').html(num0)
    },380);
       
    var s1 = $('.number.in li .num:eq(2)').html();
        var num1 = 0;
        var timer1 = null;
        timer1 = setInterval(function(){ 
        num1 += 80 ;
        if( num1 >= 11000 ){  
            clearInterval(timer1)
        }
        $('.number.in li .num:eq(2)').html(num1-40)
    },26);
    var s2 = $('.number.in li .num:eq(3)').html();
    var num2 = 0;
    var timer2 = null;
    timer2 = setInterval(function(){ 
        num2 += 10 ;
        if( num2 >= 800 ){  
            clearInterval(timer2)
        }
        $('.number.in li .num:eq(3)').html(num2)
    },46);
})