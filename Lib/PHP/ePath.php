<?php

namespace Gary\Lib\PHP;

use Bang\Lib\eString;
use Bang\Lib\Path;

class ePath extends Path {
    public static function GetFiles($folder, $exclude = array(), $search = '*.php', callable $callback = null) {
        $full_path = self::Content($folder) . '/';
        $search_arr = glob("{$full_path}{$search}");
        $search_ext = pathinfo($search, PATHINFO_EXTENSION);

        $file_arr = array();
        foreach ($search_arr as $key => $file_path) {
            $name_no_path = eString::RemovePrefix($file_path, $full_path);
            $name = eString::RemoveSuffix($name_no_path, ".{$search_ext}");
            if (!in_array($name, $exclude)) {
                array_push($file_arr, $name);
            }
        }

        if (is_callable($callback)) {
            $file_arr = $callback($file_arr);
        }
        return $file_arr;
    }
}
