/**
 * Created by alone on 2017/6/27.
 */
var isInit = false;
var isEnd = true;
var isNeedNext = false;
var tempBrow = window.navigator.userAgent.toLowerCase();
$(function () {
    var per_setp = 0;
    var isDown = false;
    var isStop = false;
    var my_time_out = null;
    var left = $('.circle_control').offset().left;
//            音频播放
    var audio = null;
//            initMusic("always.mp3");
    changeMusicSum();
    bindAMusicClick();
    $('.circle_control').mousedown(function (event) {
        stop();
        isDown = true;
        if (audio == null) {
            return false;
        }
    });
    $('.music_list_div').bind('DOMNodeInserted', function () {
        if (isInit) {
            var length = $(this).children().length;
            initMusic($('.music_list_div .current_play').attr("music-src"));
            isInit = false;
            $('.menu_and_volume_controller .number_icon').html(length);
            changePlayMusicInfo();
        }
        if (isNeedNext) {
            var current = $('.music_list_div .current_play');
            if (current.length==0) {
                $('.music_list_div .a_music:first').addClass("current_play");
                var src = $('.music_list_div .current_play').attr("music-src");
                initMusic(src);
                changePlayMusicInfo();
            } else {
                var next = current.next();
                var src = next.attr("music-src");
                initMusic(src);
                current.removeClass("current_play");
                next.addClass("current_play");
                changePlayMusicInfo();
            }
            isNeedNext = false;
        }
        bindAMusicClick();
    });
    $(document, '.circle_control').mousemove(function (event) {
        if (!isDown) {
            return false;
        }
        if (audio == null) {
            return false;
        }
        var clientX = event.clientX;
        if (clientX < left || clientX >= left + 400) {
            return false;
        }
        else {
            $('.circle_control').css({left: (clientX - left)});
            $('.top_slider .music_line').css({width: (clientX - left)});
        }
    });
    $(document).mouseup(function () {
        if (audio == null) {
            return false;
        }
        if (isDown) {
            audio.pause();
            isDown = false;
            var currentW = parseFloat($(".top_slider .music_line")
                .attr("style").split('width:')[1]);
            var time = ((currentW / 400) * audio.duration);
            audio.currentTime = time;
            audio.play();
            start();
        }
    });
    function animateSlider(temp) {
        my_time_out = setTimeout(function () {
            var currentW = parseFloat($(".top_slider .music_line")
                .attr("style").split('width:')[1]);
            if (currentW >= 399) {
                return false;
            }
            if (isStop) {
                return false;
            }
            $('.circle_control').animate({left: (currentW + temp)}, 500);
            $('.top_slider .music_line').animate({width: (currentW + temp)}, 500);
            animateSlider(temp);
        }, 1000);
    }

    function stop() {
        $('.circle_control').stop();
        $('.top_slider .music_line').stop();
        isStop = true;
        if (my_time_out != null) {
            clearTimeout(my_time_out);
        }
    }

    function start() {
        isStop = false;
        $('.next_or_prev_controller .play_or_pause').children().attr("src", "img/menu_icon/pause.png");
        $('.next_or_prev_controller .play_or_pause').attr("data-role", 1);
    }

    $('.play_controller .next_or_prev_controller .next_music')
        .on("click", function () {
            var current = $('.music_list_div .current_play');
            var nextAll = current.nextAll().length;
            if (nextAll != 0) {
                var next = current.next();
                var src = next.attr("music-src");
                initMusic(src);
                current.removeClass("current_play");
                next.addClass("current_play");
                changePlayMusicInfo();
            }
        });
    $('.play_controller .next_or_prev_controller .prev_music').on("click", function () {
        var current = $('.music_list_div .current_play');
        var nextAll = current.prevAll().length;
        if (nextAll != 0) {
            var next = current.prev();
            var src = next.attr("music-src");
            initMusic(src);
            current.removeClass("current_play");
            next.addClass("current_play");
            changePlayMusicInfo();
        }
    });
    function changePlayMusicInfo() {
        var current = $('.music_list_div .current_play');
        var title = current.children(".music_title").html();
        var aldum = current.children(".music_arist").html();
        var info = $('.play_controller .a_music_info');
        info.children(".current_music_title").html(title);
        info.children(".current_music_aldum").html(aldum);
    }

    function initMusic(src) {
        stop();
        isEnd = false;
        $('.music_loader').show();
        $('.next_or_prev_controller .play_or_pause').children().attr("src",
            "img/menu_icon/pause.png");
        $('.next_or_prev_controller .play_or_pause').attr("data-role", 1);
        if (audio != null) {
            audio.pause();
            audio.removeEventListener("canplaythrough", musicCanplay, false);
            $('audio').remove();
        }
        changePlayMusicInfo();
        audio = null;
        isDown = false;
        isStop = false;
        my_time_out = null;
        per_setp = 0;
        $('.circle_control').css({left: 0});
        $('.top_slider .music_line').css({"width": 0});
        if (tempBrow.indexOf("ie") >= 0) {
            audio = document.createElement("embed");
        } else {
            audio = document.createElement("audio");
        }
        audio.src = src;
        audio.volume = 0.5;
        audio.addEventListener("canplaythrough", musicCanplay, false);
//                无效的资源，需要提示或者直接播放下一首
        audio.addEventListener("error", error, false);
        audio.addEventListener("ended", musicEnded, false);
        var volume = parseInt($('.volume_slider .volume_line').css('height'));
        var result = (volume / 100);
        if (result > 1) {
            result = 1;
        }
        if (result < 0) {
            result = 0;
        }
        audio.volume = result;
    }

    function error() {
        layer.msg("无效的音频文件", {icon: 5});
        var current = $('.music_list_div .current_play');
        var nextAll = current.nextAll().length;
        if (nextAll != 0) {
            var next = current.next();
            var src = next.attr("music-src");
            initMusic(src);
            current.removeClass("current_play");
            next.addClass("current_play");
        } else {
            $('.next_or_prev_controller .play_or_pause').children().attr("src", "img/menu_icon/play.png");
            $('.next_or_prev_controller .play_or_pause').attr("data-role", 0);
        }
    }

    function musicCanplay() {
        audio.play();
        per_setp = (400 / audio.duration);
        animateSlider(per_setp);
        $('.music_loader').hide(500);
    }

    function musicEnded() {
        isEnd = true;
        var current = $('.music_list_div .current_play');
        var nextAll = current.nextAll().length;
        $('.circle_control').css({left: 0});
        $('.top_slider .music_line').css({"width": 0});
        if (nextAll != 0) {
            isEnd = false;
            var next = current.next();
            var src = next.attr("music-src");
            initMusic(src);
            current.removeClass("current_play");
            next.addClass("current_play");
        } else {
            $('.next_or_prev_controller .play_or_pause').children().attr("src", "img/menu_icon/play.png");
            $('.next_or_prev_controller .play_or_pause').attr("data-role", 0);
        }
    }

//            音量控制
    var isVolumeDown = false;
    var top = $('.volume_slider .volume_bottom').offset().top;
    $('.volume_slider .volume_control').mousedown(function () {

        isVolumeDown = true;
    });
    $(document, '.volume_slider .volume_control').mousemove(function (event) {
        if (!isVolumeDown) {
            return false;
        }
        var clientY = event.clientY;
        if (clientY >= top || clientY <= top + 100) {
            $('.volume_slider .volume_line').css({height: 102 - (clientY - top)});
        } else {
            return false;
        }
    });
    $(document).mouseup(function () {
        if (isVolumeDown) {
            isVolumeDown = false;
            var volume = parseInt($('.volume_slider .volume_line').css('height'));
            var result = (volume / 100);
            if (result > 1) {
                result = 1;
            }
            if (result < 0) {
                result = 0;
            }
            if (audio != null) {
                audio.volume = result;
            }
        }
    });

    $('.next_or_prev_controller .play_or_pause').on("click", function () {
        var which = $(this).attr("data-role");
        if (which == 1) {
            stop();
            if (audio != null) {
                audio.pause();
            }
            $(this).children().attr("src", "img/menu_icon/play.png");
            $(this).attr("data-role", 0);
        } else {
            start();
            if (audio != null) {
                audio.play();
                per_setp = (400 / audio.duration);
                animateSlider(per_setp);
            }
            $(this).children().attr("src", "img/menu_icon/pause.png");
            $(this).attr("data-role", 1);
        }
    });

    $('.menu_and_volume_controller .volume_icon').on("click", function () {
        var isV = $('.volume_slider').is(":visible");
        if (isV) {
            $('.volume_slider').hide();
        } else {
            $('.volume_slider').show();
            top = $('.volume_slider .volume_bottom').offset().top;
        }
    });
    $('.play_controller .menu_and_volume_controller .music_list_icon')
        .on("click", function () {
            var isV = $('.test_hidden').is(":visible");
            if (isV) {
                $('.test_hidden').hide();
            } else {
                $('.test_hidden').show();
            }
        });
    function changeMusicSum() {
        var sum = $('.music_list_div').children().length;
        $('.play_controller .menu_and_volume_controller .number_icon').html(sum);
    }

    function bindAMusicClick() {
        $('.music_list_div .a_music').on("click", function () {
            if ($(this).hasClass("current_play")) {
                return false;
            } else {
                $('.music_list_div .current_play').removeClass("current_play");
                var src = $(this).attr("music-src");
                initMusic(src);
                $(this).addClass("current_play");
                changePlayMusicInfo();
            }
        });
    }
});
function hideVolume(src) {
    $(function () {
        var isV = $('.volume_slider').is(":visible");
        if (isV) {
            $('.volume_slider').hide();
        }
        var isTest = $('.test_hidden').is(":visible");
        if (isTest) {
            $('.test_hidden').hide();
        }
    });
}
function loadMusic(which, from) {
    $(function () {
        var data = $('.test_hidden .music_list_div').attr("data-role");
        if (data == which) {
            return false;
        } else {
            $('.test_hidden .music_list_div').attr("data-role", which);
        }
        $.ajax({
            url: "index/Music/loadMusic",
            data: {id: which},
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    var musics = data.musics;
                    var result = "";
                    for (i = 0; i < musics.length; i++) {
                        var className = "";
                        var music = musics[i];
                        if (i == 0) {
                            className = "a_music current_play";
                        } else {
                            className = "a_music";
                        }
                        result += "<div class='" + className + "' " +
                            "music-src='" + music.path + "'>" +
                            "<img src='img/menu_icon/play.png' width='16' height='20'>" +
                            "<span class='music_title'>" + music.title + "</span>" +
                            "<span class='music_arist'>" + music.artist + "</span>" +
                            "<span class='music_time'>" + music.duration + "</span>" +
                            "<div class='trash'></div></div>";
                    }
                    isInit = true;
                    $('.test_hidden .music_list_div').html(result);
                    window.frames['aldumPage'].addPlayCount(which);
                    layer.tips('已添加到播放列表',
                        $('.menu_and_volume_controller .number_icon'),{tips:1});
                } else {
                    layer.msg('加载失败', {icon: 5});
                    $('.test_hidden .music_list_div').attr("data-role", 0);
                }
            },
            error: function () {
                layer.msg('未知的错误发生了', {icon: 5});
                $('.test_hidden .music_list_div').attr("data-role", 0);
            }
        });
    });
}

function addMusic(which) {
    $.ajax({
        url: "index/Music/loadMusic",
        data: {id: which},
        type: "post",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var len = $('.music_list_div .current_play').nextAll().length;
                var musics = data.musics;
                var canHasNewCurrent = false;
                if (isEnd && len == 0) {
                    canHasNewCurrent = true;
                }
                if (musics == null) {
                    return false;
                }
                var result = "";
                for (i = 0; i < musics.length; i++) {
                    var className = "";
                    var music = musics[i];
                    if (canHasNewCurrent) {
                        if (i == 0) {
                            className = "a_music current_play"
                        }
                    } else {
                        className = "a_music";
                    }
                    result += "<div class='" + className + "'" +
                        "music-src='" + music.path + "'>" +
                        "<img src='img/menu_icon/play.png' width='16' height='20'>" +
                        "<span class='music_title'>" + music.title + "</span>" +
                        "<span class='music_arist'>" + music.artist + "</span>" +
                        "<span class='music_time'>" + music.duration + "</span>" +
                        "<div class='trash'></div></div>";
                }
                if (canHasNewCurrent) {
                    isInit = true;
                }
                $('.test_hidden .music_list_div').append(result);
                window.frames['aldumPage'].addPlayCount(which);
                var number = parseInt($('.menu_and_volume_controller .number_icon').html());
                number += musics.length;
                $('.menu_and_volume_controller .number_icon').html('' + number);
                layer.tips('已添加到播放列表',
                    $('.menu_and_volume_controller .number_icon'),{tips:1});
            } else {
                layer.msg('加载失败', {icon: 5});
                $('.test_hidden .music_list_div').attr("data-role", 0);
            }
        },
        error: function () {
            layer.msg('未知的错误发生了', {icon: 5});
            $('.test_hidden .music_list_div').attr("data-role", 0);
        }
    });
}
function loadSingleMusic(id) {
    $.ajax({
        url: "index/music/getSingleMusic",
        data: {id: id},
        type: "post",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var music = data.music;
                var temp = "<div class='a_music' " +
                    "music-src='" + music.path + "'>" +
                    "<img src='img/menu_icon/play.png' width='16' height='20'>" +
                    "<span class='music_title'>" + music.title + "</span>" +
                    "<span class='music_arist'>" + music.artist + "</span>" +
                    "<span class='music_time'>" + music.duration + "</span>" +
                    "<div class='trash'></div></div>";
                isNeedNext = true;
                if ($('.music_list_div .current_play').length==0) {
                    $('.test_hidden .music_list_div').html(temp);
                } else {
                    $('.music_list_div .current_play').after(temp);
                }
                var number = parseInt($('.menu_and_volume_controller .number_icon').html());
                number++;
                $('.menu_and_volume_controller .number_icon').html('' + number);
                layer.tips('已添加到播放列表',
                    $('.menu_and_volume_controller .number_icon'),{tips:1});
            } else {
                layer.msg('未知的错误发生了', {icon: 5});
            }
        },
        error: function () {
            layer.msg('未知的错误发生了', {icon: 5});
        }
    });
}