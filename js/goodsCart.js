define(["jquery", "jquery-cookie"], function ($) {

    //加载已经加入购物车的商品 goodsList.json
    /* 
        cookie只存储商品id和数量
        加载数据需要：
            goodsCarList
            goodsList
    */
    function loadCarData(){
        new Promise(function(resolve,reject){
            $.ajax({
                url:"../data/goodsCarList.json",
                success:function(obj){
                    resolve(obj.data);
                },
                error:function(msg){
                    reject(msg);
                }
            })
        }).then(function(arr1){
            //下载第二份数据
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:"../data/goodsList2.json",
                    success:function(arr2){
                        //两个数据合并
                        var newArr = arr1.concat(arr2);
                        resolve(newArr);
                    },
                    error:function(msg){
                        reject(msg);
                    }
                })
            })
        }).then(function(arr){
            //在购物车中将所有的数据拿到
            var cookieStr = $.cookie("goods");
            if(cookieStr){
                var cookieArr = JSON.parse(cookieStr);
                var newArr = [];

                for(var i =0;i<cookieArr.length;i++){
                    for(var j =0;j<arr.length;j++){
                        if(cookieArr[i].id ==arr[j].product_id ||cookieArr[i].id == arr[j].goodsid){
                            arr[j].num=cookieArr[i].num;
                            arr[j].id = arr[j].product_id ? arr[j].product_id :arr[j].goodsid;
                            newArr.push(arr[j]);
                        }
                    }
                }
                //添加到页面上
                for(var i =0;i<newArr.length;i++){
                    var node = $(`<div class="item-row clearfix id="${newArr[i].id}"> 
                    <div class="col col-check">  
                        <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
                    </div> 
                    <div class="col col-img">  
                        <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                            <img alt="" src="${newArr[i].image}" width="80" height="80"> 
                        </a>  
                    </div> 
                    <div class="col col-name">  
                        <div class="tags">   
                        </div>     
                        <div class="tags">  
                        </div>   
                        <h3 class="name">  
                            <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                            ${newArr[i].name}
                            </a>  
                        </h3>        
                    </div> 
                    <div class="col col-price"> 
                    ${newArr[i].price}元 
                        <p class="pre-info">  </p> 
                    </div> 
                    <div class="col col-num">  
                        <div class="change-goods-num clearfix J_changeGoodsNum"> 
                            <a href="javascript:void(0)" class="J_minus">
                                <i class="iconfont"></i>
                            </a> 
                            <input tyep="text" name="2192300031_0_buy" value="${newArr[i].num}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                            <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                        </div>  
                    </div> 
                    <div class="col col-total"> 
                    ${(newArr[i].price * newArr[i].num).toFixed(1)}元 
                        <p class="pre-info">  </p> 
                    </div> 
                    <div class="col col-action"> 
                        <a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
                    </div> 
                </div>`).appendTo("#J_cartListBody .J_cartGoods");
                }
            }
        })
    }


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
        cartHover:cartHover,
        loadCarData:loadCarData
    }
})