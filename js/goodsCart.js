define(["jquery", "jquery-cookie"], function ($) {
    function download() {
        $.ajax({
            url: "../data/goodsCarList.json",
            success: function (obj) {
                var arr = obj.data;
                for (var i = 0; i < arr.length; i++) {
                    $(`<li class="J_xm-recommend-list span4">    
                    <dl> 
                        <dt> 
                            <a href="#"> 
                                <img src="${arr[i].image}"  alt="小米净水器1A（厨下式）"> 
                            </a> 
                        </dt> 
                        <dd class="xm-recommend-name"> 
                            <a href="#"> 
                                ${arr[i].name}
                            </a> 
                        </dd> 
                        <dd class="xm-recommend-price">${arr[i].price}元</dd> 
                        <dd class="xm-recommend-tips">   ${arr[i].comments}人好评    
                            <a class="btn btn-small btn-line-primary J_xm-recommend-btn" href="#" style="display: none;" id = "${arr[i].goodsid}">加入购物车</a>  
                        </dd> 
                        <dd class="xm-recommend-notice">

                        </dd> 
                    </dl>  
                </li>`).appendTo($("#J_miRecommendBox .xm-recommend ul"))
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    function cartHover(){
        //事件委托添加
        $("#J_miRecommendBox .xm-recommend ul").on("mouseenter",".J_xm-recommend-list",function(){
            $(this).find(".xm-recommend-tips a").css("display","block");
        })
        $("#J_miRecommendBox .xm-recommend ul").on("mouseleave",".J_xm-recommend-list",function(){
            $(this).find(".xm-recommend-tips a").css("display","none");
        })

        //通过事件委托实现加入购物车操作
        $("#J_miRecommendBox .xm-recommend ul").on("click",".xm-recommend-tips .btn",function(){

            //获取当前点击加入购物车按钮，商品id
            //[{id:1,num1},{id:2,num2}]转为json存储在cookie中
            var id = this.id;

            //1.先判断是否为第一次添加
            var first = $.cookie("goods") == null ? true : false;

            //2.如果是第一次添加
            if(first){
                var cookieArr = [{id:id,num:1}];
                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires:7
                })
            }else{
                //3.判断之前是否添加过
                var same = false;//假设没有添加过
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                for(var i =0;i<cookieArr.length;i++){
                    if(cookieArr[i].id == id){
                        //则判定为添加过该商品
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }
                if(!same){
                    //则判定为没有添加过，需新增商品数据
                    var obj = {id:id,num:1};
                    cookieArr.push(obj);
                }

                //最后存放到cookie中
                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires:7
                })
            }
            alert($.cookie("goods"));
            return false;
        })
    }
    return {
        download: download,
        cartHover:cartHover
    }
})