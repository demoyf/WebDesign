<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

return [
    '__pattern__' => [
        'name' => '\w+',
        '_URL_'=>'index/SendEmail',
    ],
    '[hello]'     => [
        ':id'   => ['index/hello', ['method' => 'get'], ['id' => '\d+']],
        ':name' => ['index/hello', ['method' => 'post']],
    ],
    'register' => 'index/User/register',
    'show' => 'index/User/show',
    'load' => 'index/SendEmail/load',
    'loadUpdate' => 'index/User/loadUpdate',
    'showUpdateInfo' => 'index/Info/showUpdate',
    'showReadInfo' => 'index/Info/showReadInfo',
    'showUploadPage' => 'index/IconUpload/showUpload',
    'showBlogType' => 'index/BlogSave/showType',
    'showTimeLine' => 'index/TimeLine/showTimeLine',
    'home' => 'index/Home/home',
    'toLogin'=>'index/Login/TologinPage',
    'personalPage'=>'index/Personal/showPersonalPage',
    'showBlogDetail' =>"index/BlogDetail/showBlogDetail",
    'showMusicPage'=>'index/Music/showMusicPage',
    'showMainPage'=>'index/Manage/showMainPage',
    'showManage' => 'index/Manage/showManage',
    'showManageBlog' => 'index/Manage/showManageBlog',

];
