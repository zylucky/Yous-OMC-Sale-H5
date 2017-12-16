
/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue';
import App from './app.vue';
import $ from 'jquery';
import MintUI from 'mint-ui';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import {Toast} from 'mint-ui';
import axios from 'axios';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MintUI);

//Vue.prototype.$api = "http://yhcms.tunnel.qydev.com" //api地址本地
//Vue.prototype.$api = "http://116.62.68.26:8080" //api地址116的地址ip
Vue.prototype.$api = "http://omc.urskongjian.com" //api地址线上
//Vue.prototype.$api = "http://192.168.137.54:8081" //api地址
/*Vue.prototype.$api = "http://wx.urskongjian.com:8080" //api地址*/
//Vue.prototype.$api = "http://192.168.0.222:8080" //api地址
//Vue.prototype.$api = "http://yhcms.tunnel.qydev.com" //api地址本地
//Vue.prototype.$prefix = "http://116.62.68.26:81" //图片前缀222
/*Vue.prototype.$export = "http://wx.urskongjian.com:8080" //*/
//Vue.prototype.$export = "http://omc.urskongjian.com" //可以随意改

// 微信判断是否关注
const api = "http://omc.urskongjian.com/yhcms/web/jcsj/userAuth.do";
//const api = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx109df14878717ecb&redirect_uri=http%3A%2F%2Fomc.urskongjian.com%2Fyhcms%2Fweb%2Fjcsj%2FgetOpenid.do%3F&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect";

const FollowInfo = () => { return $.post(api, {})};



//Vue.prototype.$prefix = "http://116.62.68.26:81" //图片前缀
Vue.prototype.$prefix = "http://47.92.145.21:81" //图片前缀

// 测试环境

//Vue.prototype.$export = "http://192.168.0.222:8080" //图片前缀

// 生产环境
//Vue.prototype.$api = "http://omc.urskongjian.com" //api地址
Vue.prototype.$export = "http://omc.urskongjian.com" //导出



//Vue.config.debug = true;// 开启debug模式
Vue.config.debug = true;// 开启debug模式

var router = new VueRouter({
    mode: "hash",
    hashbang: false,
    routes: [
        {
            path: '/list',
            component: require('./routers/list.vue')
        },
        {
          path: '/filter',
          component: require('./routers/search.vue'),
        },
        {
            path: '/search',
            component: require('./routers/search.vue')
        },
        {
            path: '/detail',
            component: require('./routers/detail.vue')
        },
        {
            path: '/house',
            component: require('./routers/house.vue')
        },
        {
            path: '/order',
            component: require('./routers/order.vue')
        },
        {
            path: '/select',
            component: require('./routers/select.vue')
        },
        {
            path: '/error',
            component: require('./routers/error.vue')
        },
        {
            path: '*',
            component: require('./routers/list.vue')
        },
        {
            path: '/register',//注册页面
            component: require('./routers/register.vue')
        },
        {
            path: '/login',
            component: require('./routers/login.vue')
        },
        {
            path: '/modify_pwd',//修改密码页面
            component: require('./routers/modify_pwd.vue')
        },
        {
            path: '/reset_pwd/:phone',//重置密码页面
            component: require('./routers/reset_pwd.vue')
        },
        {
            path: '/forgot_pwd',//忘记密码页面
            component: require('./routers/forgot_pwd.vue')
        },
        {
            path: '/real_name_auth',//实名认证页面
            component: require('./routers/real_name_auth.vue')
        },
        {
            path: '/per_cen',//个人中心页面
            component: require('./routers/per_cen.vue')
        },
        {
            path: '/per_information',//个人信息页面
            component: require('./routers/per_information.vue')
        },
        {
            path: '/chang_phone',//更换手机号
            component: require('./routers/chang_phone.vue')
        },
        {
            path: '/reser_page',//预约页面
            component: require('./routers/reser_page.vue')
        },
        {
            path: '/my_reser',//我的预约页面
            component: require('./routers/my_reser.vue')
        },
        {
            path: '/my_collection',//我的收藏页面
            component: require('./routers/my_collection.vue')
        },
        {
            path: '/my_nocollection',//我的收藏页面没有收藏房源数据的时候
            component: require('./routers/my_nocollection.vue')
        },
        {
            path: '/uphtm',//系统跟新维护中的页面
            component: require('./routers/uphtm.vue')
        },
        {
            path: '/test',
            component: require('./routers/test.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || '';

    // 统计代码
    if (from.name) {
        _hmt.push(['_trackPageview'
            , '/#' + to.fullPath
            , window.location.origin ]);
    } else {
        _hmt.push(['_trackPageview'
            , '/#' + to.fullPath]);
    }
    if(window.location.href.indexOf('from') !=-1){
      var url=window.location.href;
      //分享的链接
      var index1 = url.indexOf('?'),index2 = url.indexOf('#');

      var url1=url.substring(0,index1-1),url2=url.substring(index2);
      var ul1=url1+"/"+url2;
      var ul=encodeURIComponent(ul1);
        const user22 = JSON.parse(localStorage.getItem('cooknx'));
        $.post("http://omc.urskongjian.com/yhcms/web/qduser/getQdLogin.do", {
                "foreEndType": 2,
                "code": "300000045",
                "cookie": user22.sjs,
            },
            function (data) {
                window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx109df14878717ecb&redirect_uri="+ul+"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
            }, "json").catch(function (error) {
            window.location.href = "http://omc.urskongjian.com/error/uphtm.html";
        });
    }else{
          var name="code";
          var wxcode=null;
          var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
          var r = window.location.search.substr(1).match(reg);
          if (r!=null)
              {wxcode= r[2];

              }
               if(wxcode == null){
         var charString=window.location.href;
         var tt=encodeURIComponent(charString);
                   const user22 = JSON.parse(localStorage.getItem('cooknx'));
                   $.post("http://omc.urskongjian.com/yhcms/web/qduser/getQdLogin.do", {
                           "foreEndType": 2,
                           "code": "300000045",
                           "cookie": user22.sjs,
                       },
                       function (data) {
                           window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx109df14878717ecb&redirect_uri="+tt+"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
                           //alert(data); // John
                       }, "json").catch(function (error) {
                       window.location.href = "http://omc.urskongjian.com/error/uphtm.html";
                   });
      }else{
          $.post(
               "http://omc.urskongjian.com/yhcms/web/jcsj/getOpenid11.do?code="+wxcode
          ).then(function (res) {
              var data = JSON.parse(res);
              if (data.success) {
                  if(data.subscribe){
                  if (data.subscribe == 1 || data.subscribe == 3 ) {
                        if(to.path=='/register'||to.path=='/forgot_pwd'||to.path.indexOf('/reset_pwd')!=-1){
                            next();
                        }else{
                            const user = JSON.parse(localStorage.getItem('loginnx'));
                            if (!user && to.path != '/login') {
                                next({ path: '/login' });
                            }else  if (!user && to.path == '/login') {
                                next();
                            }else  if (user && to.path == '/login') {
                                next();
                            }
                            else{
                                if(user!=null) {
                                    const time = user.time == null ? 0 : user.time, now = (new Date).getMilliseconds(), delta = now - time;
                                    if (delta > 86400 * 30) {
                                        next({path: '/login'});
                                    } else {
                                        const user22 = JSON.parse(localStorage.getItem('cooknx'));
                                        if(user22 != null){
                                            //存微信的头像
                                            const head = data.headimgurl;
                                            localStorage.setItem('nxhead', JSON.stringify(head));
                                            next();
                                        }else{
                                            next({path: '/login'});
                                        }
                                        $.post("http://omc.urskongjian.com/yhcms/web/qduser/getQdLogin.do", {
                                                "foreEndType": 2,
                                                "code": "300000045",
                                                "cookie": user22.sjs,
                                            },
                                            function (data) {
                                                next();
                                                if (data.success) {
                                                } else {
                                                    if (data.userzt == 2) {
                                                        next({path: '/login'});
                                                    } else {
                                                        next({path: '/login'});
                                                    }
                                                }
                                                //alert(data); // John
                                            }, "json");
                                    }
                                }else{
                                    next({path: '/login'});
                                    //next();
                                }
                            }
                        }
                        next();
                    } else {
                        confirm("您还没有关注我们的公众号，请先关注我们的公众号！");
                        window.location.href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0NjY4ODM5OQ==&scene=123&from=singlemessage#wechat_redirect";
                        //window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0NjY4ODM5OQ==#wechat_redirect";
                    }
                }else{
                    next();
                }

                }

                else {
                    Toast({
                        message: '获取状态失败:! 请稍候再试 ' + data.message,
                        position: 'bottom'
                    });
                }
            }).catch(function (error) {
              window.location.href = "http://omc.urskongjian.com/error/uphtm.html";
          });
        }

    }
});



/*
router.beforeEach((to, from, next) => {
    if(to.path=='/register'||to.path=='/forgot_pwd'||to.path.indexOf('/reset_pwd')!=-1){
        next();
    }else{
        const user = JSON.parse(localStorage.getItem('loginnx'));
        if (!user && to.path != '/login') {
            next({ path: '/login' });
        }else  if (!user && to.path == '/login') {
            next();
        }else  if (user && to.path == '/login') {
            next();
        }else{
            if(user!=null) {
                const time = user.time == null ? 0 : user.time, now = (new Date).getMilliseconds(), delta = now - time;
                if (delta > 86400 * 3) {
                    next({path: '/login'});
                } else {
                    const user22 = JSON.parse(localStorage.getItem('cooknx'));
                    if(user22 != null){
                    }else{
                        next({path: '/login'});
                    }
                    $.post("http://116.62.68.26:8080/yhcms/web/qduser/getQdLogin.do", {
                            "foreEndType": 2,
                            "code": "300000045",
                            "cookie": user22.sjs,
                        },
                        function (data) {
                            next();
                            if (data.success) {
                            } else {
                                if (data.userzt == 2) {
                                    next({path: '/login'});
                                } else {
                                    next({path: '/login'});
                                }
                            }
                            //alert(data); // John
                        }, "json");
                }
            }else{
                next({path: '/login'});
                //next();
            }
        }
    }
});
*/


new Vue({
    el: '#app',
    router: router,
    render: function (h) {
        return h(App)
    }
});
