//处理首页导航部分
define(["jquery"], function($) {
    function download(){
        //数据下载
        $.ajax({
            type:"get",
            url:"../data/nav.json",
            success:function(result){
                // alert(result);
                var bannerArr = result.banner;

                //通过循环将数据添加到页面上
                for(var i =0 ; i< bannerArr.length;i++){
                    $(`<a href="${bannerArr[i].url}">
                    <img class="swiper-lazy swiper-lazy-loaded" src="../images/banner/${bannerArr[i].img}" alt="">
                </a>`).appendTo("#J_homeSwiper .swiper-slide");
                    
                var node = $(`<a href="#" class = 'swiper-pagination-bullet'></a>`);
                if(i ==0){
                    node.addClass("swiper-pagination-bullet-active");
                } 
                node.appendTo("#J_homeSwiper .swiper-pagination");
                }

            },
            error:function(msg){
                console.log(msg);
            }

        })

        leftNavDownload();
    }

    //实现轮播图的效果
    function banner(){
        var iNow = 0;//当前显示图片的下标
        var aImgs = null;//记录图片
        var aBtns = null;//记录圆圈

        var timer = setInterval(function(){
            iNow++;
            tab();
        },6000);

        //封装切换函数
        function tab(){
            if(!aImgs){
                aImgs = $("#J_homeSwiper .swiper-slide").find("a");
            }
            if(!aBtns){
                aBtns = $("#J_homeSwiper .swiper-pagination").find("a");
            }
            if(iNow==5){
                iNow =0;
            }

            //图片切换
            aImgs.hide().css("opacity",0.2).eq(iNow).show().animate({opacity:1},500);
            //小圆点切换
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
        }

        //添加鼠标移入移出
        $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },6000);
        })

        //点击小圆圈切换图片 【注】事件委托
        $("#J_homeSwiper .swiper-pagination").on("click","a",function(){
            iNow=$(this).index();
            tab();
            return false;//阻止a链接默认行为
        })
        
        $(".swiper-button-prev,.swiper-button-next").click(function(){
            if(this.className == "swiper-button-prev"){
                iNow--;
                if(iNow==-1){
                    iNow=4;
                }
            }else{
                iNow++;
            }
            tab();
        })
    }


    //侧边导航栏数据的加载
    function leftNavDownload(){
        $.ajax({
            url:"../data/nav.json",
            success:function(result){
                var sideArr = result.sideNav;
                for(var i =0;i<sideArr.length;i++){
                    var node = $(`<li class = 'category-item'>
                    <a href="/index.html" class = 'title'>
                        ${sideArr[i].title}
                        <em class = 'iconfont-arrow-right-big'></em>
                    </a>
                    <div class="children clearfix" style = 'display: block'>
                        
                    </div>
                </li>`);
                node.appendTo("#J_categoryList")

                //取出当前选项对应的子节点
                var childArr = sideArr[i].child;
                //取列数 一列6个
                var col = Math.ceil(childArr.length/6);
                node.find("div.children").addClass("children-col-"+col);
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }

    return {
        download: download,
        banner: banner
    }
    
})