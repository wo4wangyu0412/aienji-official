!function(n){
    var e=n.document,
    t=e.documentElement,
    i=1920,      // 设计稿的宽度
    d=i/40,    // 根字号
    o="orientationchange"in n?"orientationchange":"resize",
    a=function(){
        var n=t.clientWidth||320;n>1920&&(n=1920),
        t.style.fontSize=n/d+"px"
    };
    e.addEventListener && (n.addEventListener(o,a,!1),
    e.addEventListener("DOMContentLoaded",a,!1))
}(window);