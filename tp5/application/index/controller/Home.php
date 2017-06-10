<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/6/9
 * Time: 22:31
 */

namespace app\index\controller;
use think\Controller;
use think\Exception;
use think\Request;
use think\View;
use app\index\model\Blog\MyBlog;
class Home extends Controller
{
    public function home()
    {
        $view = new View("home/home");
        $blogs = MyBlog::where('id', '>', 0)->paginate(9);
        $view->blogs = $blogs;
        $temp = json_encode($blogs);
        $view->total = json_decode($temp)->total;
        $view->per_page = json_decode($temp)->per_page;
        return $view->fetch();
    }

    public function getNextPage(Request $request)
    {
        $page = $request->post('page');
        if (!($page > 0)) {
            $page = 1;
        }
        $blogs = MyBlog::where('id', '>', 0)->paginate(9);
        try {
            $result = array('code'=>200,'blogs'=>$blogs);
            echo json_encode($result);
        } catch (Exception $exception) {
            $result = array('code'=>500);
            echo json_decode($result);
        }
    }
}