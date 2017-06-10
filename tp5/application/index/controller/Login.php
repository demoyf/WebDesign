<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/6/10
 * Time: 19:44
 */

namespace app\index\controller;


use think\Controller;
use think\View;

class Login extends Controller
{
    public function TologinPage()
    {
        $view = new View('login/TologinPage');
        return $view->fetch();
    }
}