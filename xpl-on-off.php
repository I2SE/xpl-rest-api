<?php

    function xpl_on_off($host, $channel, $on_off)
    {
        $body = '{ "value": ' . strval(intval($on_off)) . ' }';

        $header  = "PUT /api/channel/physical/io/" . strval($channel) . " HTTP/1.0\r\n";
        $header .= "Host: $host\r\n";
        $header .= "Content-Type: application/json\r\n";
        $header .= "Content-Length: " . strlen($body) . "\r\n";
        $header .= "\r\n";

        $fp = @fsockopen($host, 80);
        if ($fp === FALSE)
            return FALSE;

        $rv = fputs($fp, $header . $body);
        if ($rv === FALSE)
        {
            fclose($fp);
            return FALSE;
        }

        $response = "";
        while (!feof($fp))
            $response .= fgets($fp, 10 * 1024);
        fclose($fp);

        // search HTTP body
        $jsonstr = ltrim(strstr($response, "\r\n\r\n"));
        $json = json_decode($jsonstr, TRUE);

        // check for result properties, indicates error
        if (array_key_exists('result', $json))
            return $json['result'];

        // everthing is fine, return success to caller
        return TRUE;
    }

    xpl_on_off('192.168.178.191', 1, FALSE);
