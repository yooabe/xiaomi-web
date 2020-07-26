console.log(1);

//配置当前项目引入模块
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "goodsCart": "goodsCart"
    },
    shim:{
        "jquery-cookie":["jquery"]
    }
})

require(["goodsCart"],function(goodsCart){
    goodsCart.download();
    goodsCart.cartHover();
})