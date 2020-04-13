<?php

namespace Gary\Lib\PHP;

class eJson {
    /**
     * @param mixed $data
     *
     * @return string
     */
    public static function Encode($data, $options = null) {
        if (null == $options) {
            $options = JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP;
        }

        return json_encode($data, $options);
    }
}
