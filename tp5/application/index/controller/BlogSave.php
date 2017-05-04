<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/5/1
 * Time: 21:39
 */

namespace app\index\controller;


use think\Controller;

class BlogSave extends Controller
{

    public function showType()
    {
        return $this->fetch();
    }
}