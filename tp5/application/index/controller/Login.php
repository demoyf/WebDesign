<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/6/10
 * Time: 19:44
 */
namespace app\index\controller;

use think\Controller;
use think\Cookie;
use think\Request;
use think\Session;
use think\View;
use app\index\model\Personal\User as UserModel;
use app\index\model\Personal\Info as InfoModel;
class Login extends Controller
{
    public function TologinPage()
    {
        $view = new View('login/TologinPage');
        return $view->fetch();
    }

    public function checkUser(Request $request)
    {
        $user_name = $request->post("userName");
        $password = $request->post("password");
        $md_pas = md5($password);
        $checkUser = UserModel::get(['phone' => $user_name]);
        if ($checkUser['password'] == $password) {
            Cookie::set("phone", $user_name,7*24*3600);
            echo 200;
        } else {
            echo 500;
        }
    }

    public function checkNickName(Request $request)
    {
        $nickname = $request->post('nickname');
        $info = InfoModel::get(['nickname'=>$nickname]);
        if ($info) {
            echo 200;
        } else {
            echo 500;
        }
    }
}