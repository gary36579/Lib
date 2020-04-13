<?php

namespace Gary\Lib\PHP;

use Bang\Lib\Path;
use Models\ErrorCode;

class eTextFile {
    private $Path;

    public function __construct($path, $default_content = '', $mode = 755) {
        $this->Path = Path::Content($path);
        $this->CreateIfNotFound($default_content, $mode);
    }

    private function CreateIfNotFound($default_content, $mode) {
        if (!is_file($this->Path)) {
            $file = fopen($this->Path, 'w');
            $is_success = fwrite($file, $default_content);
            if (false === $is_success) {
                throw new \Exception("File write fail: {$this->Path}", ErrorCode::UnKnownError);
            }
            fclose($file);
            $this->ChangeMode($mode);
        }
    }

    public function Read() {
        $file = $this->FileOpen('r');
        $size = $this->GetFileSize();
        if ($size > 0) {
            $content = fread($file, $size);
            if (false === $content) {
                throw new \Exception("File read fail: {$this->Path}", ErrorCode::UnKnownError);
            }
        } else {
            $content = null;
        }
        fclose($file);
        return $content;
    }

    public function Write($content = '', $mode = 'w') {
        $file = $this->FileOpen($mode);
        $is_success = fwrite($file, $content);
        if (false === $is_success) {
            throw new \Exception("File write fail: {$this->Path}", ErrorCode::UnKnownError);
        }
        fclose($file);
    }

    public function Append($content) {
        $this->Write($content, 'a');
    }

    public function GetFileInfo() {
        $file = $this->FileOpen('r');
        $info = fstat($file);
        fclose($file);
        return $info;
    }

    public function GetFileSize() {
        $info = $this->GetFileInfo();
        $size = $info['size'];
        return $size;
    }

    public function GetFileSizeKB() {
        $size = $this->GetFileSize();
        return doubleval($size) / 1024.0;
    }

    public function GetFileSizeMB() {
        $size = $this->GetFileSizeKB();
        return $size / 1024.0;
    }

    public function GetFileSizeGB() {
        $size = $this->GetFileSizeMB();
        return $size / 1024.0;
    }

    private function FileOpen($mode) {
        if (!is_file($this->Path)) {
            throw new \Exception("File not exist: {$this->Path}", ErrorCode::UnKnownError);
        }

        $file = fopen($this->Path, $mode);
        if (false === $file) {
            throw new \Exception("File open fail: {$this->Path}", ErrorCode::UnKnownError);
        }
        return $file;
    }

    /**
     * 修改權限.
     *
     * @param string $mode EX:755
     */
    private function ChangeMode($mode = 755) {
        $oct_mode = octdec($mode);
        return chmod($this->Path, $oct_mode);
    }
}
