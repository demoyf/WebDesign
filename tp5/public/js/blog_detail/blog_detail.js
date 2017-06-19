/**
 * Created by alone on 2017/6/14.
 */
$(function () {
    var temp = 1;
    var left_blog_list = "<div class='block_move'></div>";
    $('.blog_content_and_nav .blog_content').children().each(function () {
        if ($(this).is("h2")) {
            $(this).attr("id", temp);
            left_blog_list += "<li class='h2_list'><a href='"+("#"+temp)+"' " +
                "data-role='"+temp+"'>"+ $(this).text()
                +"</li></a>";
            temp++;
        }
        if ($(this).is("h3")) {
            $(this).attr("id", temp);
            left_blog_list += "<li class='h3_list'><a href='"+("#"+temp)+"' " +
                "data-role='"+temp+"'>"+ $(this).text()
            temp++;
        }
    });
    if (temp!=1) {
        $('.blog_list').html(left_blog_list);
        var h2_height = parseInt($('.h3_list').css('height'));
        var margin_top = parseInt($('.blog_list').offset().top);
        $('.blog_list li a').click(function () {
            var data_role = $(this).attr('data-role');
            var result = parseInt(data_role) * h2_height;
            $('.blog_list .block_move').animate(
                {top: (margin_top + result + 32)}, 300);
            for(i=0;i<$('.blog_list li').length;i++) {
                if (i==(data_role-1)) {
                    $('.blog_list li').eq(i).children("a").css({"color":"#00b19e"});
                }else {
                    $('.blog_list li').eq(i).children("a").css({"color":"#494949"});
                }
            }
            setTimeout(function () {
                var demo = parseInt($('body,html').scrollTop());
                $('body,html').animate({scrollTop: demo - 100}, 100);
            },100);
        });
    }else {
        $('.blog_list').hide();
    }
    $('.blog_list li:first a').css({"color": "#00b19e"});
    var h2_height = parseInt($('.h3_list').css('height'));
    var margin_top = parseInt($('.blog_list').offset().top);
    var isMove = false;
    $(window).scroll(function () {
        if (!$('.blog_list').is(":visible")){
            return false;
        }
        if (isMove) {
            return false;
        }
        $('.blog_content_and_nav .blog_content').children("h2").each(function () {
            var id = $(this).attr("id");
            var offsetTop = $(this).offset().top;
            var scrollT = $(window).scrollTop();
            if ((offsetTop - scrollT) < 120 && (offsetTop - scrollT) > 80) {
                isMove = true;
                var result = parseInt(id) * h2_height;
                for(i=0;i<$('.blog_list li').length;i++) {
                    if (i==(id-1)) {
                        $('.blog_list li').eq(i).children("a").css({"color":"#00b19e"});
                    }else {
                        $('.blog_list li').eq(i).children("a").css({"color":"#494949"});
                    }
                }
                $('.blog_list .block_move').animate(
                    {top: (margin_top + result + 30)}, 100, function () {
                        isMove = false;
                    });
            }
        });
        $('.blog_content_and_nav .blog_content').children("h3").each(function () {
            var id = $(this).attr("id");
            var offsetTop = $(this).offset().top;
            var scrollT = $(window).scrollTop();
            if ((offsetTop - scrollT) < 120 && (offsetTop - scrollT) > 80) {
                var result = parseInt(id) * h2_height;
                for(i=0;i<$('.blog_list li').length;i++) {
                    if (i==(id-1)) {
                        $('.blog_list li').eq(i).children("a").css({"color":"#00b19e"});
                    }else {
                        $('.blog_list li').eq(i).children("a").css({"color":"#494949"});
                    }
                }
                $('.blog_list .block_move').animate({top: (margin_top + result + 33)}, 100
                    , function () {
                        isMove = false;
                    });
            }
        });
        var comment = $('.blog_comment_div').offset().top;
        var scrollT = $(window).scrollTop();
        var height = $(window).height();
    });
});