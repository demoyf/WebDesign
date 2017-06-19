<?php
namespace app\index\controller;
use app\index\model\Blog\MyBlog;
use think\Controller;
use think\Cookie;
use think\Exception;
use think\Request;
use think\View;
use app\index\model\Personal\Info as InfoModel;
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/6/1
 * Time: 16:51
 */
class TimeLine extends Controller
{
    public function showTimeLine()
    {

        $monthShort = array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");
        $view = new View("time_line/showTimeLine");
        $blogs = MyBlog::where('id', '>', 0)->order("my_time",'desc')->paginate(8);
        $view->blogs = $blogs;
        $temp = json_encode($blogs);
        $view->total = json_decode($temp)->total;
        $view->per_page = json_decode($temp)->per_page;
        foreach ($blogs as $blog) {
            $time = $blog['my_time'];
            $result = explode(" ", $time);
            $arr = explode("-", $result[0]);
            $blog['year'] = $arr[0];
            $blog['month'] = $monthShort[$arr[1]-1];
            $blog['day'] = (int)$arr[2];
            $blog['detail_time'] = $result[1];
            if ($arr[2]==1){
                $blog['sup'] = "st";
            }else if ($arr[2]==2){
                $blog['sup'] = "nd";
            }else if ($arr[2]==3){
                $blog['sup'] = "rd";
            }else{
                $blog['sup'] = "th";
            }
        }
        $isHas = false;
        $phone = "";
        $info = "";
        if (Cookie::has('phone', 'xyf_')) {
            $isHas = true;
            $phone = Cookie::get('phone', 'xyf_');
            $info = InfoModel::get(['phone'=>$phone]);
            if ($info ==null) {
                $isHas = false;
            }
        }
        if ($isHas) {
            $view->phone = $phone;
            $view->nickname = $info['nickname'];
        }else{
            $view->phone = "404";
            $view->nickname = "404";
        }
        return $view->fetch();
    }

    public function getPageById(Request $request)
    {
        $page = $request->post('page');
        if (!($page > 0)) {
            $page = 1;
        }
        $monthShort = array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");
        try {
            $blogs = MyBlog::where('id', '>', 0)->order("my_time")->paginate(8,false,['page' => $page]);
            foreach ($blogs as $blog) {
                $time = $blog['my_time'];
                $result = explode(" ", $time);
                $arr = explode("-", $result[0]);
                $blog['year'] = $arr[0];
                $blog['month'] = $monthShort[$arr[1]-1];
                $blog['day'] = (int)$arr[2];
                $blog['detail_time'] = $result[1];
                if ($arr[2]==1){
                    $blog['sup'] = "st";
                }else if ($arr[2]==2){
                    $blog['sup'] = "nd";
                }else if ($arr[2]==3){
                    $blog['sup'] = "rd";
                }else{
                    $blog['sup'] = "th";
                }
            }
            $result = array('code'=>200,'blogs'=>$blogs);
            echo json_encode($result);
        } catch (Exception $exception) {
            $result = array('code' => 500);
            echo json_encode($result);
        }/**/
    }
}