<?php

namespace Gary\Lib\PHP;

class eFtp {
    protected $ftp;
    protected $host;
    protected $username;
    protected $password;
    protected $pasv;

    public function __construct($host, $username, $password, $pasv = false) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->pasv = $pasv;
    }

    public function Connect() {
        $ftp_connect = ftp_connect($this->host) or die("Could not connect to {$this->host}");
        $login_result = ftp_login($ftp_connect, $this->username, $this->password);
        ftp_pasv($ftp_connect, $this->pasv);

        $this->ftp = $ftp_connect;
    }

    public function Close() {
        ftp_close($this->ftp);
    }

    public function GetFiles($path) {
        $this->Connect();

        $ftp_rawlist = ftp_rawlist($this->ftp, $path);
        $rawlist = array();
        foreach ($ftp_rawlist as $raw) {
            $rawinfo = preg_split("/[\s]+/", $raw, 9);
            if ('total' !== $rawinfo[0]) {
                $rawlist["{$path}/{$rawinfo[8]}"] = array(
                    'name' => $rawinfo[8],
                    'path' => $path,
                    'chmod' => $rawinfo[0],
                    'num' => $rawinfo[1],
                    'owner' => $rawinfo[2],
                    'group' => $rawinfo[3],
                    'size' => $rawinfo[4],
                    'month' => $rawinfo[5],
                    'day' => $rawinfo[6],
                    'time' => $rawinfo[7],
                    'raw' => $raw,
                );
            }
        }

        $this->Close();

        return $rawlist;
    }

    public function GetFilesByRecursive($path) {
        $this->Connect();
        $result = $this->BaseGetFilesByRecursive($path);
        $this->Close();

        return $result;
    }

    private function BaseGetFilesByRecursive($path) {
        $lines = ftp_rawlist($this->ftp, $path);
        $result = array();
        foreach ($lines as $line) {
            $tokens = explode(' ', $line);
            $name = $tokens[count($tokens) - 1];
            $type = $tokens[0][0];
            $filepath = "{$path}/{$name}";

            if ('d' == $type) {
                $result = array_merge($result, $this->BaseGetFilesByRecursive($filepath));
            } else {
                $result[] = $filepath;
            }
        }

        return $result;
    }
}
