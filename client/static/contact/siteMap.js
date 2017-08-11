function insertSort(arr){
    var max = arr[0];
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        if(arr[i]>max){
            max=arr[i];
        }         
    }
    return max;
}
$(function(){
    var qq=new Array();
    $(".main ul").each(function(i,e){
        $(e).find('li').each(function(ii,el){
            var heights=$(el).height();
            qq[''+ii+'']=heights;
        });
        $(e).find('li').height(insertSort(qq));
        qq=[];
    });
})