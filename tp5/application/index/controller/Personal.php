<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/6/12
 * Time: 17:16
 */

namespace app\index\controller;

use think\Controller;
use think\View;

class Personal extends Controller
{
    public function showPersonalPage()
    {
        $view = new View('personal/showPersonalPage');
        return $view->fetch();
    }
}