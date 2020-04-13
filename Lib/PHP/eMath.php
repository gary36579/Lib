<?php

namespace Gary\Lib\PHP;

class eMath {
    /**
     * 阶乘.
     */
    public static function Factorial($n = 1) {
        return array_product(range(1, $n));
    }

    /**
     * 排列数.
     */
    public static function P($n = 1, $m = 1) {
        return self::Factorial($n) / self::Factorial($n - $m);
    }

    /**
     * 组合数.
     */
    public static function C($n = 1, $m = 1) {
        return self::P($n, $m) / self::Factorial($m);
    }

    /**
     * 排列结果.
     */
    public static function Permutation($a = array(), $m = 1) {
        $r = array();
        $n = count($a);
        if ($m <= 0 || $m > $n) {
            return $r;
        }
        for ($i = 0; $i < $n; $i++) {
            $b = $a;
            $t = array_splice($b, $i, 1);
            if (1 == $m) {
                $r[] = $t;
            } else {
                $c = self::Permutation($b, $m - 1);
                foreach ($c as $v) {
                    $r[] = array_merge($t, $v);
                }
            }
        }

        return $r;
    }

    /**
     * 组合结果.
     */
    public static function Combination($a = array(), $m = 1) {
        $r = array();

        $n = count($a);
        if ($m <= 0 || $m > $n) {
            return $r;
        }

        for ($i = 0; $i < $n; $i++) {
            $t = array($a[$i]);
            if (1 == $m) {
                $r[] = $t;
            } else {
                $b = array_slice($a, $i + 1);
                $c = self::Combination($b, $m - 1);
                foreach ($c as $v) {
                    $r[] = array_merge($t, $v);
                }
            }
        }

        return $r;
    }
}
