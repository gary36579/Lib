<?php

namespace Gary\Lib\PHP;

use Bang\Lib\eString;

class eReflectionClass extends \ReflectionClass {
    private $class_name;
    private $has_parent;
    private $has_struct;
    private $static;
    private $public;
    private $private;

    public function __construct($class_name, $has_parent = false, $has_struct = false) {
        parent::__construct($class_name);
        $this->class_name = $class_name;
        $this->has_parent = $has_parent;
        $this->has_struct = $has_struct;
        $this->static = $this->GetAllAction(\ReflectionMethod::IS_STATIC);
        $this->public = $this->GetAllAction(\ReflectionMethod::IS_PUBLIC);
        $this->private = $this->GetAllAction(\ReflectionMethod::IS_PRIVATE);
    }

    public function GetAll() {
        return array_merge($this->static, $this->public, $this->private);
    }

    public function GetPublic() {
        $public_static_arr = $this->GetPublicStatic();
        $public_arr = $this->public;
        return $this->RemoveOther($public_arr, $public_static_arr);
    }

    public function GetPrivate() {
        $private_static_arr = $this->GetPrivateStatic();
        $private_arr = $this->private;
        return $this->RemoveOther($private_arr, $private_static_arr);
    }

    public function GetStatic() {
        return $this->static;
    }

    public function GetPublicStatic() {
        $static_arr = $this->GetStatic();
        $public_arr = $this->public;
        return $this->RemoveOther($static_arr, $public_arr, true);
    }

    public function GetPrivateStatic() {
        $static_arr = $this->GetStatic();
        $private_arr = $this->private;
        return $this->RemoveOther($static_arr, $private_arr, true);
    }

    public function IsPublicAction($action) {
        $reflect = $this->GetAction($action);
        return $reflect->isPublic();
    }

    public function IsPrivateAction($action) {
        $reflect = $this->GetAction($action);
        return $reflect->isPrivate();
    }

    public function IsStaticAction($action) {
        $reflect = $this->GetAction($action);
        return $reflect->isStatic();
    }

    public function IsAjaxAction($action) {
        $reflect = $this->GetAction($action);
        return $reflect->isPublic() && eString::StartsWith($action, 'Ajax');
    }

    public function IsPassAction($action) {
        $reflect = $this->GetAction($action);
        return $reflect->isPublic() && eString::EndsWith($action, '_Pass');
    }

    private function GetAction($action) {
        $reflect = parent::getMethod($action);
        return $reflect;
    }

    private function GetAllAction($method = 0) {
        $reflect_arr = parent::getMethods($method);
        $action_arr = $this->ToKeyValue($reflect_arr);
        return $action_arr;
    }

    private function ToKeyValue($reflect_arr = []) {
        $arr = [];
        foreach ($reflect_arr as $reflect_method) {
            $arr[$reflect_method->name] = $reflect_method;
            if (!$this->has_parent && $this->class_name != $reflect_method->class) {
                unset($arr[$reflect_method->name]);
            }
        }
        if (!$this->has_struct) {
            unset($arr['__construct']);
            unset($arr['__destruct']);
        }
        ksort($arr);
        return $arr;
    }

    private function RemoveOther($primary, $exclude, $reve = false) {
        foreach ($primary as $reflect_name => $reflect_method) {
            if ($reve) {
                if (!array_key_exists($reflect_name, $exclude)) {
                    unset($primary[$reflect_name]);
                }
            } else {
                if (array_key_exists($reflect_name, $exclude)) {
                    unset($primary[$reflect_name]);
                }
            }
        }
        return $primary;
    }
}
