<?php

namespace Gary\Lib\PHP;

use Bang\Lib\eString;
use Config;

class eRequest {
    public static function GetIpAddress() {
        $vars = [
            'HTTP_CLIENT_IP',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_X_FORWARDED',
            'HTTP_X_CLUSTER_CLIENT_IP',
            'HTTP_FORWARDED_FOR',
            'HTTP_FORWARDED',
            'REMOTE_ADDR',
            'HTTP_VIA',
        ];
        foreach ($vars as $key => $value) {
            if (isset($_SERVER[$value])) {
                $ip_array = eString::Split($_SERVER[$value], ',');
                return $ip_array[0];
            }
        }
    }

    public static function InWhiteList($ip) {
        $list = Config::WhiteListIp;

        return !empty($list) && in_array($ip, Config::WhiteListIp, true);
    }
}
