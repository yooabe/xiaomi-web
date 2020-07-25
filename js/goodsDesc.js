define(["jquery", "jquery-cookie"], function ($) {

    function download() {
        //找到详情页商品id
        var product_id = valueByName(location.search, "product_id");
        //通过商品id找到商品信息
        $.ajax({
            type:"get",
            url:"../data/goodsList.json",
            success:function(arr){
                
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }


    //获取当前要加载详情的商品数据
    //?name1=value1&name2=value2
    function valueByName(search, name) {
        //查找这个健值对的开始
        var start = search.indexOf(name + "=");
        if (start == -1) {
            return null;
        } else {
            var end = search.indexOf("&", start);
            if (end == -1) {
                end = search.length;
            }

            //提取健值对
            var str = search.substring(start, end);
            var arr = str.split("=");
            return arr[1];
        }
    }

    return {
        download:download
    }
})