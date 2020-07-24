console.log("驾车")
/* 
    配置当前这个项目用到哪些模块
*/
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "nav":"nav",
        "slide":"slide",
        "data":"data"
    },
    shim:{
        //设置依赖关系
        "jquery-cookie":["jquery"]
    }
})

require(["nav","slide","data"],function(nav,slide,data){

    nav.download();
    nav.banner();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();

    slide.download();
    slide.slideTab();

    data.download();
    
})