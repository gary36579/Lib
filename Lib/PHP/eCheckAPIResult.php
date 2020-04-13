<?php

namespace Gary\Lib\PHP;

use Bang\Lib\ResponseBag;
use Bang\Lib\TaskResult;

/**
 * 判斷API回傳值
 * API回傳值須符合TaskResult格式.
 *
 * @author Gary
 */
class eCheckAPIResult {
    /**
     * 將API回傳值加入ResponseBag中.
     *
     * @param string $BagName 物件名稱(索引,為空時將直接使用該物件類別名稱)
     * @param mixed  $Result  API回傳值TaskResult
     *
     * @return ResponseBag
     */
    public static function ByResponseBag($BagName, $Result) {
        $CheckResponse = self::CheckResponse($Result);
        if ($CheckResponse->IsSuccess) {
            ResponseBag::Add($BagName, $CheckResponse->Value);
        } else {
            ResponseBag::Add('ErrorMessage', $CheckResponse->Message);
        }
    }

    /**
     * 將API回傳值加入TaskResult中.
     *
     * @param mixed $Result API回傳值TaskResult
     *
     * @return TaskResult
     */
    public static function ByTaskResult($Result) {
        return self::CheckResponse($Result);
    }

    /**
     * 將API回傳值加入TaskResult中.
     *
     * @param mixed $Result API回傳值TaskResult
     *
     * @return TaskResult
     */
    private static function CheckResponse($Result) {
        $TaskResult = new TaskResult();
        if (is_object($Result)) {
            if (isset($Result->IsSuccess)) {
                if ($Result->IsSuccess) {
                    $TaskResult->SetSuccess($Result->Value, $Result->Message);
                } else {
                    $TaskResult->SetUnsuccess($Result->Message, $Result->Value);
                }
            } else {
                $TaskResult->SetUnsuccess('API Response Error！');
            }
        } elseif (is_null($Result)) {
            $TaskResult->SetUnsuccess('API No Response！');
        }
        return $TaskResult;
    }
}
