<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/4/29
 * Time: 21:17
 */

namespace app\index\controller;
use think\Controller;
use think\Exception;
use think\Request;
use app\index\model\Personal\User as UserModel;
use think\View;
use app\index\model\Personal\Info as InfoModel;
class User extends Controller
{
    public function register(Request $request)
    {
//        分页
        $page = $request->get("page");
        if (!$page > 0) {
            $page = 1;
        }
        $view = new View('user/register');
        $userMode = UserModel::where('phone','>',1)->paginate(1,false,['page'=>$page]);
        $view->users = $userMode;
        $view->page = $userMode->currentPage();
        return $view->fetch();
    }

    public function show()
    {
        $view = new View('user/show');
        return $view->fetch();
    }

    public function add(Request $request)
    {
//        1
        $phone =   $request->post('phone');
        $password = $request->post('password');
        if ($this->isExist($phone)) {
            $array = array("code" => 1, "result" => "exist");
            echo json_encode($array);
        } else {
            $user1 = new UserModel();
            $user1->phone = $phone;
            $user1->password = $password;
            $info = new InfoModel();
            $info->nickname = '123456';
            $info->phone = $phone;
            try {
                $isSuccess = $user1->isUpdate(false)->save()&&$info->isUpdate(false)->save();
            } catch (Exception $exception) {
                UserModel::get(['phone' => $phone])->delete();
                $isSuccess = false;
            }
            if ($isSuccess) {
                $demo = array("code" => 2, "result" => "success");
                echo json_encode($demo);
            } else {
                $array = array("code" => 0, "result" => "fail");
                echo json_encode($array);
            }
        }
    }

    public function isExist($phone='')
    {
        $user = UserModel::get(['phone' => $phone]);
        if ($user) {
            return true;
        } else {
            return false;
        }
    }

    public function read(Request $request)
    {
        $phone = $request->post('phone');
        if ($phone == '') {
            $arra["code"] = -1;
            echo json_encode($arra);
        } else {
            $user = UserModel::get(['phone'=>$phone]);
            if ($user != null) {
                $array = $user->toArray();
                $array["code"] = 1;
                echo json_encode($array);
            } else {
                $arra["code"] = 0;
                echo json_encode($arra);
            }
        }
    }

    public function loadUpdate()
    {
        return $this->fetch();
    }

    public function update(Request $request)
    {
        $phone = $request->post('phone');
        $password = $request->post('password');
        $user = UserModel::get(['phone' => $phone]);
        $user->password = $password;
        if ($user->isUpdate(true)->save()) {
            echo 'success';
        } else {
            echo 'error';
        }
    }
}