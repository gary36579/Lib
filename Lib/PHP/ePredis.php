<?php

namespace Gary\Lib\PHP;

use Config\RedisConfig;
use Predis\Client;
use Predis\Collection\Iterator\Keyspace;

class ePredis {
    private $client;

    public function __construct() {
        $client = new Client([
            'host' => RedisConfig::Host,
            'port' => RedisConfig::Port,
        ]);
        $client->connect();
        $this->client = $client;
    }

    public function Incr($key) {
        $params = [
            'INCR',
            $key,
        ];
        $response = $this->client->executeRaw($params);
        return $response;
    }

    public function IncrBy($key, $num) {
        $params = [
            'INCRBY',
            $key,
            $num,
        ];
        $response = $this->client->executeRaw($params);
        return $response;
    }

    public function ExpireByDays($key, $days) {
        $seconds = $days * 24 * 60 * 60;
        $this->Expire($key, $seconds);
    }

    public function TTL($key) {
        $params = [
            'TTL',
            $key,
        ];
        $response = $this->client->executeRaw($params);
        return $response;
    }

    public function Expire($key, $seconds) {
        $params = [
            'EXPIRE',
            $key,
            $seconds,
        ];
        $this->client->executeRaw($params);
    }

    public function PExpire($key, $milliseconds) {
        $params = [
            'PEXPIRE',
            $key,
            $milliseconds,
        ];
        $this->client->executeRaw($params);
    }

    public function Delete($key) {
        $params = [
            'DEL',
            $key,
        ];
        $response = $this->client->executeRaw($params);
        return $response;
    }

    public function Scan($parttern, $count = 100) {
        $iter = new Keyspace($this->client, $parttern, $count);
        $keys = [];
        foreach ($iter as $key) {
            $keys[] = $key;
        }
        return $keys;
    }

    public function Set($key, $value) {
        $params = [
            'SET',
            $key,
            $value,
        ];
        $this->client->executeRaw($params);
    }

    public function Exists($key) {
        $params = [
            'EXISTS',
            $key,
        ];
        $responses = $this->client->executeRaw($params);
        $result = 1 === \intval($responses);
        return $result;
    }

    public function Get($key) {
        $params = [
            'GET',
            $key,
        ];
        $responses = $this->client->executeRaw($params);
        return $responses;
    }

    public function Keys($partten) {
        $params = [
            'KEYS',
            $partten,
        ];
        $responses = $this->client->executeRaw($params);
        return $responses;
    }

    // <editor-fold defaultstate="collapsed" desc="Z datas">

    /**
     * @param type $key
     * @param type $data
     */
    public function zRem($key, $data) {
        $params = [
            'ZREM',
            $key,
            $data,
        ];
        $response = $this->client->executeRaw($params);
        return $response;
    }

    public function zIncrBy($key, $score, $data) {
        $params = [
            'ZINCRBY',
            $key,
            $score,
            $data,
        ];
        $result = $this->client->executeRaw($params);
        return $result;
    }

    /**
     * @param type $key
     * @param type $score
     * @param type $data
     */
    public function zAdd($key, $score, $data) {
        $params = [
            'ZADD',
            $key,
            $score,
            $data,
        ];
        $this->client->executeRaw($params);
    }

    /**
     * @param type $key
     * @param type $start_score
     * @param type $end_score
     * @param type $withscores
     * @param type $limit_skip
     * @param type $limit_take
     *
     * @return array
     */
    public function zRevRangeByScore($key, $start_score, $end_score, $withscores = true, $limit_skip = 0, $limit_take = 100) {
        if ($withscores) {
            $params = [
                'ZREVRANGEBYSCORE',
                $key,
                $start_score,
                $end_score,
                'WITHSCORES',
                'LIMIT',
                $limit_skip,
                $limit_take,
            ];

            $responses = $this->client->executeRaw($params);
            $results = [];
            for ($index = 0; $index < count($responses); $index += 2) {
                $score = $responses[$index + 1];
                $data = $responses[$index];
                $results[$data] = doubleval($score);
            }
            return $results;
        }
        $params = [
            'ZREVRANGEBYSCORE',
            $key,
            $start_score,
            $end_score,
            'LIMIT',
            $limit_skip,
            $limit_take,
        ];
        $responses = $this->client->executeRaw($params);
        return $responses;
    }

    /**
     * @param type $key
     * @param type $start_index
     * @param type $end_index
     * @param type $withscores
     *
     * @return array
     */
    public function zRevRange($key, $start_index, $end_index, $withscores = true) {
        if ($withscores) {
            $params = [
                'ZREVRANGE',
                $key,
                $start_index,
                $end_index,
                'WITHSCORES',
            ];

            $responses = $this->client->executeRaw($params);
            $results = [];
            for ($index = 0; $index < count($responses); $index += 2) {
                $score = $responses[$index + 1];
                $data = $responses[$index];
                $results[$data] = doubleval($score);
            }
            return $results;
        }
        $params = [
            'ZREVRANGE',
            $key,
            $start_index,
            $end_index,
        ];
        $responses = $this->client->executeRaw($params);
        return $responses;
    }

    /**
     * @param type $key
     * @param type $start_index
     * @param type $end_index
     * @param type $withscores
     *
     * @return array
     */
    public function zRange($key, $start_index, $end_index, $withscores = true) {
        $params = [
            'ZRANGE',
            $key,
            $start_index,
            $end_index,
        ];
        if ($withscores) {
            $params[] = 'WITHSCORES';
            $responses = $this->client->executeRaw($params);
            $results = [];
            for ($index = 0; $index < count($responses); $index += 2) {
                $score = $responses[$index + 1];
                $data = $responses[$index];
                $results[$data] = doubleval($score);
            }
            return $results;
        }
        $responses = $this->client->executeRaw($params);
        return $responses;
    }

    // </editor-fold>
}
