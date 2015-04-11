/**
* lazyLoad v0.1.0
* 图片延迟加载插件(配合jQuery或Zepto使用)
*
* @WalkerBe http://www.walkerbe.com/
* MIT
*/

(function ( factory ) {
    if ( typeof define === 'function' && define.amd ) {
        define(factory);
    } else {
        window.lazyLoad = factory();
    }
})(function () {

    var screenHeight = $(window).height();
    var scrollTop = 0;
    var body = navigator.userAgent.match(/(chrome|safari|iPhone|iPod|Android|ios|iPad)/i) ? $('body') : $('html');

    function lazyLoad ( opts ) {
        this.opts = merge({
            src: 'data-src',
            el: $('img.lazyLoad'),
            offset: 0
        }, opts || {});

        this.init();
    }

    lazyLoad.prototype = {
        init: function () {
            var _el = this.opts.el;
            for ( var i = 0, len = _el.length; i < len; i++) {
                this.loadImage($(_el[i]));
                this.scrollLoad($(_el[i]));
            }
        },

        // 检测图片是否可以加载
        canLoad: function ( el ) {
            scrollTop = body.scrollTop();

            if ( scrollTop + screenHeight + this.opts.offset > el.offset().top ) {
                return true;
            }

            return false;
        },

        // 加载图片
        loadImage: function ( el ) {

            if ( !this.canLoad( el ) ) {
                return;
            }

            if ( el.attr(this.opts.src) == 'loaded' ) {
                return;
            }

            el.attr('src', el.attr(this.opts.src));
            el.attr(this.opts.src, 'loaded');

            // console.log(el.attr('src') + '--- Is Loaded!');
        },

        // 图片位置改变时(页面滚动时)
        scrollLoad: function ( el ) {
            var _this = this;
            $(window).scroll(function () {
                _this.loadImage( el );
            });
        }

    };


    function merge ( defaults, opts ) {
        for ( var name in defaults ) {
            if ( opts[name] === undefined ) {
                opts[name] = defaults[name];
            }
        }

        return opts;
    }


    return lazyLoad;

});