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
use think\Db;
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
        $md_pas = sha1($password);
        $checkUser = UserModel::get(['phone' => $user_name]);
        if ($checkUser == null) {
            echo 404;
        }else{
            if ($checkUser['password'] == $md_pas) {
                Cookie::set("phone", $user_name,24*3600);
                echo 200;
            } else {
                echo $md_pas;
            }
        }
    }

    public function checkNickName(Request $request)
    {
        $nickname = $request->post('nickname');
        $info = InfoModel::get(['nickname'=>$nickname]);
        if ($info==null) {
            echo 200;
        } else {
            echo 500;
        }
    }

    public function Register(Request $request)
    {
        $email = $request->post('email');
        $nickname = $request->post('nickname');
        $password = $request->post('password');
        $user = new UserModel();
        $user->phone = $email;
        $user->password = sha1($password);
        $info = new InfoModel();
        $info->phone = $email;
        $info->nickname = $nickname;
        $isSuccess = false;
        $user->save();
        $info->save();
        $isSuccess = true;
        if ($isSuccess) {
            $arr = array("code"=>200);
            Cookie::delete("phone");
            Cookie::set("phone", $email,24*3600);
            echo json_encode($arr);
        } else {
            $arr = array("code"=>500);
            echo json_encode($arr);
        }
    }
}