/**
 * Created by alone on 2017/6/23.
 */
$(function () {
    initPage();
    bindPageClick();
    bindDeleteAndTopClick();
    function initPage() {
        var total = parseInt($('.table_blog_info').attr("data-role"));
        var per_page = parseInt($('.table_blog_info table').attr("data-role"));
        var pageSum = 1;
        if (total == 0) {
            pageSum = 1;
        } else {
            if (total % per_page == 0) {
                pageSum = total / per_page;
            } else {
                pageSum = parseInt(total / per_page) + 1;
            }
        }
        if (pageSum < 4) {
            var paginationHtml = "";
            for (i = 1; i <= pageSum; i++) {
                if (i == 1) {
                    paginationHtml += "<li class='current'>" + i +
                        "</li>";
                } else {
                    paginationHtml += "<li>" + i +
                        "</li>";
                }
            }
            $('.pagination_div .number_li_div').html(paginationHtml);
            bindPageClick();
        }

        $('.to_prev').click(function () {
            var current = $('.pagination_div .number_li_div .current');
            var page = current.html();
            page = parseInt(page);
            var nextSum = current.nextAll().length;
            if (page == 1) {
                return false;
            }
            if (nextSum == 2) {
                if (page - 1 > 1) {
                    $('.pagination_div  .number_li_div').children(":last").remove();
                    var html = "<li>"
                        + (page - 2) + "</li>";
                    $('.pagination_div .number_li_div').children(":first").before(html);
                    bindPageClick();
                }
            }
            if (nextSum == 3) {
                $('.pagination_div .number_li_div').children(":last").remove();
                var html = "<li>"
                    + (page - 1) + "</li>";
                $('.pagination_div  .number_li_div').children(":first").before(html);
                bindPageClick();
            }
            current.prev().addClass("current");
            current.removeClass("current");
            changeTable();
        });
        $('.to_next').click(function () {
            var current = $('.pagination_div  .number_li_div .current');
            var page = current.html();
            page = parseInt(page);
            var nextSum = current.nextAll().length;
            if (page == pageSum) {
                return false;
            }
            if (nextSum == 1) {
                if (page + 1 < pageSum) {
                    $('.pagination_div  .number_li_div').children(":first").remove();
                    var html = "<li>"
                        + (page + 2) + "</li>";
                    $('.pagination_div  .number_li_div').append(html);
                    bindPageClick();
                }
            }
            if (nextSum == 0) {
                if (page != pageSum) {
                    $('.pagination_div  .number_li_div').children(":first").remove();
                    var html = "<li>"
                        + (page + 1) + "</li>";
                    $('.pagination_div  .number_li_div').append(html);
                    bindPageClick();
                }
            }
            current.next().addClass("current");
            current.removeClass("current");
            changeTable();
        });
    }

    function bindPageClick() {
        $('.pagination_div .number_li_div li').click(function () {
            $('.pagination_div .number_li_div li.current').removeClass("current");
            $(this).addClass("current");
            changeTable();
        });
    }

    function changeTable() {
        var load = layer.load(3);
        var page = $('.pagination_div .number_li_div li.current').html();
        var per_page = parseInt($('.table_blog_info table').attr("data-role"));
        $.ajax({
            url: "index/Manage/getTagsNext",
            type: "post",
            data: {page: page},
            dataType: "json",
            success: function (data) {
                layer.closeAll();
                if (data.code==500) {
                    layer.msg('发生了不可知的错误', {icon: 5});
                    return false;
                }
                var result = "<tr class='table_head'><th>#</th><th>标签名</th>" +
                    "<th>删除</th><th>修改</th></tr>";
                var tags = data.data;
                for (i=0;i<tags.length;i++) {
                    var tag = tags[i];
                    result += "<tr class='table_item' data-role='" + tag.id + "'>" +
                        "<td class='tag_id'>" + (per_page * (page - 1) + (i + 1)) + "</td>" +
                        "<td class='tag_name'>" + tag.tag + "</td>" +
                        "<td class='delete_button'> <button>删除</button></td> <td class='update_button'>" +
                        "<button>修改</button> </td></tr>";
                }
                $('.table_blog_info table').html(result);
                bindDeleteAndTopClick();
            },
            error: function () {
                layer.close(load);
                layer.msg('发生了不可知的错误', {icon: 5});
            }
        });
    }

    function bindDeleteAndTopClick() {
        $('.table_item .delete_button button').on("click", function () {
            var dataRole = $(this).parent().parent().attr("data-role");
            var title = $(this).parent().siblings(".tag_name").text();
            var which = $(this).parent().parent();
            layer.confirm('确定删除:《' + title + '》?', {
                title:"删除标签",
                btn: ['嗯,删了', '留着吧'] //按钮
            }, function () {
                $.ajax({
                    url: "index/Manage/deleteTags",
                    data: {id: dataRole},
                    type: "post",
                    success: function (data) {
                        if (data == 200) {
                            which.remove();
                        } else {
                            layer.msg("删除失败", {icon: 5});
                        }
                    },
                    error: function () {
                        layer.msg("删除失败", {icon: 5});
                    }
                });
                layer.closeAll();
            });
        });
        $('.table_item .update_button button').on("click", function () {
            var dataRole = $(this).parent().parent().attr("data-role");
            var title = $(this).parent().siblings(".tag_name").text();
            var myInfo = $(this).parent().siblings(".tag_name");
            layer.prompt({title: '修改'+title, formType: 3}, function(text, index){
                layer.close(index);
                $.ajax({
                    url:"index/Manage/upadtaTags",
                    data:{id:dataRole,info:text},
                    type:"post",
                    success:function (data) {
                        if (data==200) {
                            myInfo.html(text);
                        }else {
                            layer.msg("修改失败");
                        }
                    },
                    error:function () {
                        layer.msg("修改失败");
                    }
                });
            });
        });
    }
});