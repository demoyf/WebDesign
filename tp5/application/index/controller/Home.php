<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/6/9
 * Time: 22:31
 */

namespace app\index\controller;


use think\Controller;
use think\View;

class Home extends Controller
{
    public function home()
    {
        $view = new View("home/home");
        return $view->fetch();
    }
}