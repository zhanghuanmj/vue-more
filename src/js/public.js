/**
 * author: zhanghuan
 * created: 2018/4/4
 * describe: ajax的封装
 */
import $ from 'jquery';

var $public = function () {
    this.init.apply(this, arguments);
};
$public.prototype = {
    init: function () {

    },
    // ajax请求
    getRequest: function (options, callback) {
        var type = options.type ? options.type : "POST";
        var url = options.url;
        var data = options.data || {};
        var headers = options.headers || {};
        var dataType = options.dataType || 'json';
        var getTime = new Date().getTime();

        if (url.indexOf('?') > -1) {
            url = url + '&_=' + getTime;
        } else {
            url = url + '?_=' + getTime;
        }

        return $.ajax({
            type: type,
            dataType: dataType,
            timeout: 900000,
            url: url,
            data: data,
            traditional: true,
            headers: headers,
            success: function (res) {
                callback && callback(res);
                return false;
            },
            error: function (err) {

                return false;
            }
        });
    },
    getHashStr: function (name) {
        var url = location.hash; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?")) {
            var str = url.substr(url.indexOf("?") + 1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
        return theRequest[name];
    }
};
export default new $public();
