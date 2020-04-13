<?php

namespace Gary\Lib\PHP;

use Bang\Lib\eString;
use Bang\Lib\Url;

class eBundle {
    public static function Js($file_name, $js_files_array, $use_cache = false) {
        $version = '';
        if ($use_cache && eString::IsNotNullOrSpace(\Config::Version)) {
            $version = '?v=' . \Config::Version;
        }

        if (eString::IsNullOrSpace($file_name) && isset($js_files_array[0])) {
            $file_name = $js_files_array[0];
        }

        foreach ($js_files_array as $value) {
            $url = Url::Content($value);
            echo "<script src='{$url}{$version}'/></script>\n";
        }
    }

    public static function Css($file_name, $css_files_array, $use_cache = false) {
        $version = '';
        if ($use_cache && eString::IsNotNullOrSpace(\Config::Version)) {
            $version = '?v=' . \Config::Version;
        }

        if (eString::IsNullOrSpace($file_name) && isset($css_files_array[0])) {
            $file_name = $css_files_array[0];
        }

        foreach ($css_files_array as $value) {
            $url = Url::Content($value);
            echo "<link href='{$url}{$version}' rel='stylesheet' type='text/css'/>\n";
        }
    }
}
