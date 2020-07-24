console.log("驾车")
/* 
    配置当前这个项目用到哪些模块
*/
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "nav":"nav",
        "slide":"slide"
    },
    shim:{
        //设置依赖关系
        "jquery-cookie":["jquery"]
    }
})

require(["nav","slide"],function(nav,slide){

    nav.download();
    nav.banner();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();

    slide.download();
    slide.slideTab();
})