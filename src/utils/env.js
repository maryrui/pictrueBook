/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
// let routerMode = 'history';
let imgBaseUrl = 'http://images.cangdu.org/';


if (process.env.NODE_ENV == 'development') {
        baseUrl="http://unicorn.aiteyou.net";
    // baseUrl="http://192.168.0.222";
}else if(process.env.NODE_ENV == 'production'){

    // baseUrl = 'http://cangdu.org:8001';
    baseUrl="http://unicorn.aiteyou.net";
}

export {
    baseUrl,
    // routerMode,
    imgBaseUrl,
}