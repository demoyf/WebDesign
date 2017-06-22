/**
 * Created by alone on 2017/6/22.
 */
$(function () {
    $('.character_content .slide h2').each(function () {
        var text = $(this).text();
        var result = "";
        for(i=0;i<text.length;i++) {
            result += "<span>" + text.charAt(i) + "</span>";
        }
        $(this).html(result);
    });
    var isAnimate = false;
    $('.next_button').on("click", function () {
        if (isAnimate) {
            return false;
        }else{
            isAnimate = true;
        }
        var current = $('.slide_current');
        var span_length = $('.slide_current h2 span').length;
        if ( $('.slide_current').nextAll().length==0) {
            $('.character_content .slide:first').addClass("slide_prepare");
        }else {
            $('.slide_current').next().addClass("slide_prepare");
        }
        $('.slide_current h2 span').each(function (i) {
            var temp = $(this);
            setTimeout(function () {
                var num = temp.nextAll().length;
                if (num==parseInt(span_length/2)) {
                    $('.slide_prepare h2 span').each(function (i) {
                        var temp = $(this);
                        setTimeout(function () {
                            temp.addClass("enter");
                            var num = temp.nextAll().length;
                            if (num==0) {
                                setTimeout(function () {
                                    if (current.nextAll().length==0) {
                                        current.removeClass("slide_current");
                                        current.children().children().each(function () {
                                            $(this).removeClass("out");
                                        });
                                        $('.slide_prepare ').children().children().each(function () {
                                            $(this).removeClass("enter");
                                        });
                                        $('.character_content .slide:first').addClass("slide_current");
                                        $('.slide_prepare ').removeClass("slide_prepare");
                                    }else {
                                        current.next().addClass("slide_current");
                                        current.removeClass("slide_current");
                                        current.children().children().each(function () {
                                            $(this).removeClass("out");
                                        });
                                        $('.slide_prepare ').children().children().each(function () {
                                            $(this).removeClass("enter");
                                        });
                                        $('.slide_prepare ').removeClass("slide_prepare");
                                    }
                                    isAnimate = false;
                                }, 1100);
                            }
                        }, 100*(i+1));
                    });
                }
                temp.addClass("out");
            }, 100*(i+1));
        });
    });
    $('.prev_button').on("click", function () {
        if (isAnimate) {
            return false;
        }else{
            isAnimate = true;
        }
        var current = $('.slide_current');
        var span_length = $('.slide_current h2 span').length;
        if ( $('.slide_current').nextAll().length==6) {
            $('.character_content .slide:last').addClass("slide_prepare");
        }else {
            $('.slide_current').prev().addClass("slide_prepare");
        }
        $('.slide_current h2 span').each(function (i) {
            var temp = $(this);
            setTimeout(function () {
                var num = temp.nextAll().length;
                if (num==parseInt(span_length/2)) {
                    $('.slide_prepare h2 span').each(function (i) {
                        var temp = $(this);
                        setTimeout(function () {
                            temp.addClass("enter");
                            var num = temp.nextAll().length;
                            if (num==0) {
                                setTimeout(function () {
                                    if (current.nextAll().length==6) {
                                        current.removeClass("slide_current");
                                        current.children().children().each(function () {
                                            $(this).removeClass("out");
                                        });
                                        $('.slide_prepare ').children().children().each(function () {
                                            $(this).removeClass("enter");
                                        });
                                        $('.character_content .slide:last').addClass("slide_current");
                                        $('.slide_prepare').removeClass("slide_prepare");
                                    }else {
                                        current.prev().addClass("slide_current");
                                        current.removeClass("slide_current");
                                        current.children().children().each(function () {
                                            $(this).removeClass("out");
                                        });
                                        $('.slide_prepare').children().children().each(function () {
                                            $(this).removeClass("enter");
                                        });
                                        $('.slide_prepare').removeClass("slide_prepare");
                                    }
                                    isAnimate = false;
                                }, 1100);
                            }
                        }, 100*(i+1));
                    });
                }
                temp.addClass("out");
            }, 100*(i+1));
        });
    });
});