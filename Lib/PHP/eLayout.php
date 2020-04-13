<?php

namespace Gary\Lib\PHP;

use Bang\Lib\ResponseBag;
use Bang\Lib\Url;
use Bang\Lib\ViewBag;
use Bang\MVC\Route;
use Models\ControllerBase\SessionUser;

class eLayout {
    public static function HeadInfo() {
        $ViewBag = ViewBag::Get();

        echo "<meta charset='UTF-8'>\n";
        echo "<meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>\n";
        echo "<meta name='description' content='{$ViewBag->Description}'>\n";
        echo "<meta name='renderer' content='webkit'\n>";
        echo "<title>{$ViewBag->GetTitle()}</title>\n";
    }

    public static function Favicon($name = 'favicon') {
        $url = Url::Img("{$name}.ico");
        echo "<link rel='shortcut icon' type='image/x-icon' href='{$url}'/>\n";
    }

    public static function ErrorMessage() {
        echo "<script>\n";
        if (SessionUser::HasTempMessage()) {
            $msg = SessionUser::GetTempMessage();
            echo "$.SetSystemAlert.WithoutTitle(\"{$msg}\");\n";
        }
        if (ResponseBag::Contains('ErrorMessage')) {
            $msg = ResponseBag::Get('ErrorMessage');
            echo "$.SetSystemAlert.WithoutTitle(\"{$msg}\");\n";
        }
        echo "</script>\n";
    }

    // <Plugin>

    /**
     * @version 3.4.1
     */
    public static function Source_Jquery() {
        eBundle::Js('Common', array(
            'Gary/Plugin/jquery/jquery.min.js',
            'Gary/Plugin/jquery/extend.js',
        ), true);
    }

    /**
     * @version 2.1.5
     */
    public static function Source_JqueryNumber() {
        eBundle::Js('Common', array(
            'Gary/Plugin/jquery-number/jquery.number.min.js',
        ), true);
    }

    /**
     * @version 1.5.0
     */
    public static function Source_JqueryMarquee() {
        eBundle::Js('Common', array(
            'Gary/Plugin/jquery-marquee/jquery.marquee.min.js',
        ), true);
    }

    /**
     * @version 3.3.4
     */
    public static function Source_JqueryConfirm() {
        eBundle::Js('Common', array(
            'Gary/Plugin/jquery-confirm/jquery-confirm.min.js',
            'Gary/Plugin/jquery-confirm/extend.js',
        ), true);
        eBundle::Css('Common', array(
            'Gary/Plugin/jquery-confirm/jquery-confirm.min.css',
        ), true);
    }

    /**
     * @version 1.19.1
     */
    public static function Source_JqueryValidate() {
        $Route = Route::Current();
        eBundle::Js('Common', array(
            'Gary/Plugin/jquery-validation/jquery.validate.min.js',
            'Gary/Plugin/jquery-validation/jquery.validate.bootstrap.tooltip.min.js',
            "Gary/Plugin/jquery-validation/i18n/{$Route->lang}.js",
            'Gary/Plugin/jquery-validation/extend.js',
        ), true);
    }

    /**
     * @version 1.0.5
     */
    public static function Source_JqueryCsv() {
        eBundle::Js('Common', array(
            'Gary/Plugin/jquery-csv/jquery.csv.min.js',
        ), true);
    }

    /**
     * @version 4.0.1
     */
    public static function Source_JqueryWaypoints() {
        eBundle::Js('Common', array(
            'Gary/Plugin/Waypoints/jquery.waypoints.min.js',
        ), true);
    }

    /**
     * @version 3.4.1
     */
    public static function Source_Bootstrap() {
        eBundle::Js('Common', array(
            'Gary/Plugin/bootstrap/js/bootstrap.min.js',
            'Gary/Plugin/bootstrap/js/extend.js',
        ), true);
        eBundle::Css('Common', array(
            'Gary/Plugin/bootstrap/css/bootstrap.min.css',
        ), true);
    }

    /**
     * @version 1.13.12
     */
    public static function Source_BootstrapSelect() {
        $Route = Route::Current();
        eBundle::Js('Common', array(
            'Gary/Plugin/bootstrap-select/bootstrap-select.min.js',
            "Gary/Plugin/bootstrap-select/i18n/{$Route->lang}.js",
        ), true);
        eBundle::Css('Common', array(
            'Gary/Plugin/bootstrap-select/bootstrap-select.min.css',
        ), true);
    }

    /**
     * smalot/bootstrap-datetimepicker.
     *
     * @version 2.4.4
     */
    public static function Source_BootstrapDatetimePicker() {
        $Route = Route::Current();
        eBundle::Js('Common', array(
            'Gary/Plugin/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js',
            "Gary/Plugin/bootstrap-datetimepicker/i18n/{$Route->lang}.js",
            'Gary/Plugin/bootstrap-datetimepicker/_DateTimePicker.js',
        ), true);
        eBundle::Css('Common', array(
            'Gary/Plugin/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css',
        ), true);
    }

    /**
     * @version 5.11.2
     */
    public static function Source_FontAwesome() {
        eBundle::Css('Common', array(
            'Gary/Plugin/font-awesome/css/all.min.css',
        ), true);
    }

    /**
     * @version 2.24.0
     */
    public static function Source_Moment() {
        eBundle::Js('Common', array(
            'Gary/Plugin/moment/moment-with-locales.min.js',
        ), true);
    }

    /**
     * @version 4.9.0
     */
    public static function Source_TinyMce() {
        eBundle::Js('Common', array(
            'Gary/Plugin/tinymce/tinymce.min.js',
            'Gary/Plugin/tinymce/jquery.tinymce.min.js',
        ), true);
    }

    /**
     * @version 0.14.1
     */
    public static function Source_JsXlsx() {
        eBundle::Js('Common', array(
            'Gary/Plugin/js-xlsx/xlsx.full.min.js',
        ), true);
    }

    /**
     * @version 2.0.2
     */
    public static function Source_FileSaver() {
        eBundle::Js('Common', array(
            'Gary/Plugin/FileSaver/FileSaver.min.js',
        ), true);
    }

    /**
     * @version 2.9.3
     */
    public static function Source_ChartJs() {
        eBundle::Js('Common', array(
            'Gary/Plugin/ChartJs/Chart.bundle.min.js',
        ), true);
        eBundle::Css('Common', array(
            'Gary/Plugin/ChartJs/Chart.min.css',
        ), true);
    }

    /**
     * @version 2.10.0
     *
     * @author blueimp/JavaScript-MD5
     */
    public static function Source_MD5() {
        eBundle::Js('Common', array(
            'Gary/Plugin/Misc/md5.min.js',
        ), true);
    }

    /**
     * @version 12 Jul 2013
     */
    public static function Source_QRcodejs() {
        eBundle::Js('Common', array(
            'Gary/Plugin/qrcodejs/qrcode.min.js',
        ), true);
    }

    public static function Source_GaryLib() {
        eBundle::Js('Common', array(
            'Gary/Lib/JS/Config.js',
            'Gary/Lib/JS/Lib.js',
        ), true);
    }

    public static function Source_MiscJs() {
        eBundle::Js('Common', array(
            'Content/Common/js/Misc.js',
        ), true);
    }

    public static function Source_EventJs() {
        eBundle::Js('Common', array(
            'Content/Common/js/Event.js',
        ), true);
    }

    public static function Source_Style() {
        if (\Config::Less) {
            $version = \Config::Version;
            echo "<link href='Content/Common/css/style.less?v={$version}' rel='stylesheet/less' type='text/css'/>";

            eBundle::Js('Common', array(
                'Gary/Plugin/Less/less.min.js',
            ), true);
        } else {
            eBundle::Css('Common', array(
                'Content/Common/css/style.min.css',
            ), true);
        }
    }

    public static function Source_Jsmpeg() {
        eBundle::Js('Common', array(
            'Gary/Plugin/jsmpeg/jsmpeg.min.js',
        ), true, true);
    }

    // </Plugin>
}
