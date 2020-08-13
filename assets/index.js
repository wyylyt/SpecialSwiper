/*
 * @Author: wanjikun
 * @LastEditTime: 2020-08-13 16:50:04
 * @description: Do not edit
 */
;(function ($) {
    var SpecialSwiper = function SpecialSwiper($this, options,callback) {
        var defaults = {
            swiperEl:null,
            swiperDotsEl:null,
            data:[]
        };
        this.options = $.extend(defaults, options);
        this.state = {
            slideActive: 0,
            mySwiper2:null,
            slideTouched:false
        };
        this.callback = callback;

        this.initHtml();
        this.initDots();
        this.initSwiper();

    };
    /**
     * 生成轮播html
     */
    SpecialSwiper.prototype.initHtml=function() {
        var data = this.options.data
        var html=''
        for (var i = 0; i < data.length; i++){
            var str = '<div class="swiper-slide" _id='+data[i].id+'>'+
                        '<div class="slide-box">'+
                            '<img src="'+data[i].rotationimg+'" />'+
                        '</div>'+
                      '</div>'
            html += str
        }
        $(this.options.swiperEl+" .swiper-wrapper").html(html)
    }
    /**
     * 生成dots
     */
    SpecialSwiper.prototype.initDots=function () {
        var data = this.options.data
        var html=''
        for (var i = 0; i < data.length; i++){
            var classStr = this.returnDotClass(i)
            var str = '<span class="'+classStr+'">'+
                         '<span class="animateDot"></span>'+
                      '</span>'
            html += str
        }
        $(this.options.swiperDotsEl).html(html)

    }
    /**
     * 匹配dots对应的class
     */
    SpecialSwiper.prototype.returnDotClass = function(ind){
        let slideActive;
        if (this.state.slideActive === 0) {
            slideActive = this.options.data.length - 1;
        } else {
            slideActive =
            this.state.slideActive > this.options.data.length ? 0 : this.state.slideActive - 1;
        }

        let classStr = "";
        if (ind < slideActive) {
        classStr = "swiper-dot-item swiper-dot-item-slide";
        } else if (ind == slideActive) {
        if (this.state.slideTouched) {
            classStr = "swiper-dot-item swiper-dot-item-slide active";
        } else {
            classStr = "swiper-dot-item active";
        }
        } else {
        classStr = "swiper-dot-item";
        }
        return classStr;
    }

    SpecialSwiper.prototype.initSwiper = function () {
        var that = this;
        this.mySwiper2 = new Swiper(".swiper-container2", {
            autoplay: 2900, //自动滑动间隔 要与css里动画时长保持一致
            loop: true,
            onSlideChangeStart: function(swiper)  {
                that.state.slideActive = swiper.activeIndex;
                that.initDots()
            },
            onTouchStart: function(swiper) {
                that.state.slideTouched = true;
            }
          });

          $(this.options.swiperEl+" .swiper-wrapper .swiper-slide").click(function(){
            // console.log($(this).attr("_id"));
            that.callback($(this).attr("_id"))
        })
    }

    $.fn.createSwiper = function (options,callback) {
        return new SpecialSwiper(this, options,callback);
    };
})(jQuery);