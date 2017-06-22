<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/6/22
 * Time: 0:54
 */

namespace app\index\controller;


use think\Controller;
use think\View;

class Manage extends Controller
{
    public function showMainPage()
    {
        return $this->fetch();
    }

    public function showManage()
    {
        $view = new View("manage/showManage");
        return $view->fetch();
    }

}