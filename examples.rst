Examples
========


cURL examples
~~~~~~~~~~~~~

The following examples uses curl which is available in nearly all Linux distributions.
It also shows parts of the communication, e.g. the received HTTP headers in the response.


Query common XPL Rail device information
----------------------------------------

This example queries common device properties.

.. code-block:: shell

   curl -v http://192.168.178.191/api/device

.. code-block:: none

   * Hostname was NOT found in DNS cache
   *   Trying 192.168.178.191...
   * Connected to 192.168.178.191 (192.168.178.191) port 80 (#0)
   > GET /api/device HTTP/1.1
   > User-Agent: curl/7.35.0
   > Host: 192.168.178.191
   > Accept: */*
   >
   * HTTP 1.0, assume close after body
   < HTTP/1.0 200 OK
   < Server: lwIP/1.4.1
   < Access-Control-Allow-Origin: *
   < Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS
   < Access-Control-Allow-Headers: Content-Type
   < Content-Length: 288
   < Content-Type: application/json
   < Pragma: no-cache
   <
   * Closing connection 0

.. code-block:: json

   {
       "product" : "I2XPLR4-IO600",
       "modelname" : "XPL Rail",
       "hardware_version" : "1.0",
       "software_version" : "0.12",
       "vcs_version" : "r1132",
       "hostname" : "j-m-io600-2",
       "mac_address" : "00:01:87:0A:00:15",
       "mac_address_plc" : "00:01:87:0A:00:14",
       "serial" : "0000000815",
       "uuid" : "444d5314-1000-4b00-9400-0001870a0015"
   }


Check configuration status of a physical channel
------------------------------------------------

This example queries the current configuration of the physical channel 1.

.. code-block:: shell

   curl -v http://192.168.178.191/api/channel/physical/io/1

.. code-block:: none

   * Hostname was NOT found in DNS cache
   *   Trying 192.168.178.191...
   * Connected to 192.168.178.191 (192.168.178.191) port 80 (#0)
   > GET /api/channel/physical/io/1 HTTP/1.1
   > User-Agent: curl/7.35.0
   > Host: 192.168.178.191
   > Accept: */*
   >
   * HTTP 1.0, assume close after body
   < HTTP/1.0 200 OK
   < Server: lwIP/1.4.1
   < Access-Control-Allow-Origin: *
   < Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS
   < Access-Control-Allow-Headers: Content-Type
   < Content-Length: 73
   < Content-Type: application/json
   < Pragma: no-cache
   <
   * Closing connection 0

.. code-block:: json

   {
       "label" : "Channel 1",
       "supported_types" : ["di", "do", "ai", "s0"],
       "enabled" : 0
   }


Configure physical channel 1 as Digitial Output
-----------------------------------------------

This example reconfigures the physical channel 1 as digital output.

.. code-block:: shell

   curl -v -X PUT -H "Content-Type: application/json" -d '{"type":"do","mode":"normal"}' http://192.168.178.191/api/channel/physical/io/1

.. code-block:: none

   * Hostname was NOT found in DNS cache
   *   Trying 192.168.178.191...
   * Connected to 192.168.178.191 (192.168.178.191) port 80 (#0)
   > PUT /api/channel/physical/io/1 HTTP/1.1
   > User-Agent: curl/7.35.0
   > Host: 192.168.178.191
   > Accept: */*
   > Content-Type: application/json
   > Content-Length: 29
   >
   * upload completely sent off: 29 out of 29 bytes
   * HTTP 1.0, assume close after body
   < HTTP/1.0 200 OK
   < Server: lwIP/1.4.1
   < Access-Control-Allow-Origin: *
   < Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS
   < Access-Control-Allow-Headers: Content-Type
   < Content-Length: 175
   < Content-Type: application/json
   < Pragma: no-cache
   <
   * Closing connection 0

.. code-block:: json

   {
       "label" : "Channel 1",
       "supported_types" : ["di", "do", "ai", "s0"],
       "type" : "do",
       "enabled" : 1,
       "mode" : "normal",
       "virtual_channel" : 0,
       "level" : "direct",
       "delay_on" : 0,
       "delay_off" : 0,
       "value" : 0
   }


Switch channel 1 (Digitial Output) on
-------------------------------------

This example switches the physical digital channel on.

.. code-block:: shell

   curl -v -X PUT -H "Content-Type: application/json" -d '{"value":1}' http://192.168.178.191/api/channel/physical/io/1

.. code-block:: none

   * Hostname was NOT found in DNS cache
   *   Trying 192.168.178.191...
   * Connected to 192.168.178.191 (192.168.178.191) port 80 (#0)
   > PUT /api/channel/physical/io/1 HTTP/1.1
   > User-Agent: curl/7.35.0
   > Host: 192.168.178.191
   > Accept: */*
   > Content-Type: application/json
   > Content-Length: 11
   >
   * upload completely sent off: 11 out of 11 bytes
   * HTTP 1.0, assume close after body
   < HTTP/1.0 200 OK
   < Server: lwIP/1.4.1
   < Access-Control-Allow-Origin: *
   < Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS
   < Access-Control-Allow-Headers: Content-Type
   < Content-Length: 175
   < Content-Type: application/json
   < Pragma: no-cache
   <
   * Closing connection 0

.. code-block:: json

   {
       "label" : "Channel 1",
       "supported_types" : ["di", "do", "ai", "s0"],
       "type" : "do",
       "enabled" : 1,
       "mode" : "normal",
       "virtual_channel" : 0,
       "level" : "direct",
       "delay_on" : 0,
       "delay_off" : 0,
       "value" : 1
   }


Configure physical channel 1 as Digitial Input
----------------------------------------------

.. code-block:: shell

   curl -v -X PUT -H "Content-Type: application/json" -d '{"type":"di","mode":"normal"}' http://192.168.178.191/api/channel/physical/io/1

.. code-block:: none

   * Hostname was NOT found in DNS cache
   *   Trying 192.168.178.191...
   * Connected to 192.168.178.191 (192.168.178.191) port 80 (#0)
   > PUT /api/channel/physical/io/1 HTTP/1.1
   > User-Agent: curl/7.35.0
   > Host: 192.168.178.191
   > Accept: */*
   > Content-Type: application/json
   > Content-Length: 29
   >
   * upload completely sent off: 29 out of 29 bytes
   * HTTP 1.0, assume close after body
   < HTTP/1.0 200 OK
   < Server: lwIP/1.4.1
   < Access-Control-Allow-Origin: *
   < Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS
   < Access-Control-Allow-Headers: Content-Type
   < Content-Length: 173
   < Content-Type: application/json
   < Pragma: no-cache
   <
   * Closing connection 0

.. code-block:: json

   {
       "label" : "Channel 1",
       "supported_types" : ["di", "do", "ai", "s0"],
       "type" : "di",
       "enabled" : 1,
       "mode" : "normal",
       "pullup" : 0,
       "virtual_channel" : 0,
       "level" : "direct",
       "threshold" : 0,
       "value" : 0
   }


Query state of physical channel 1 (Digitial Input)
--------------------------------------------------

In this example, the JSON response should only contain the actual state, but not
configuration properties of the channel.

.. code-block:: shell

   curl -v http://192.168.178.191/api/channel/physical/io/1?filter=config

.. code-block:: none

   * Hostname was NOT found in DNS cache
   *   Trying 192.168.178.191...
   * Connected to 192.168.178.191 (192.168.178.191) port 80 (#0)
   > GET /api/channel/physical/io/1?filter=config HTTP/1.1
   > User-Agent: curl/7.35.0
   > Host: 192.168.178.191
   > Accept: */*
   >
   * HTTP 1.0, assume close after body
   < HTTP/1.0 200 OK
   < Server: lwIP/1.4.1
   < Access-Control-Allow-Origin: *
   < Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS
   < Access-Control-Allow-Headers: Content-Type
   < Content-Length: 11
   < Content-Type: application/json
   < Pragma: no-cache
   <
   * Closing connection 0

.. code-block:: json

   {
       "value" : 1
   }


Query current readings of physical channel 1 (S0 Input)
-------------------------------------------------------

In this example, the physical channel 1 is configured as S0 input and the
query retrieves the current meter reading.

.. code-block:: shell

   curl -v http://192.168.178.191/api/channel/physical/io/1

.. code-block:: none

   * Hostname was NOT found in DNS cache
   *   Trying 192.168.178.191...
   * Connected to 192.168.178.191 (192.168.178.191) port 80 (#0)
   > GET /api/channel/physical/io/1 HTTP/1.1
   > User-Agent: curl/7.35.0
   > Host: 192.168.178.191
   > Accept: */*
   >
   * HTTP 1.0, assume close after body
   < HTTP/1.0 200 OK
   < Server: lwIP/1.4.1
   < Access-Control-Allow-Origin: *
   < Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS
   < Access-Control-Allow-Headers: Content-Type
   < Content-Length: 162
   < Content-Type: application/json
   < Pragma: no-cache
   <
   * Closing connection 0

.. code-block:: json

   {
       "label" : "Channel 1",
       "supported_types" : ["di", "do", "ai", "s0"],
       "type" : "s0",
       "enabled" : 1,
       "pulses_per_unit" : 1000,
       "unit" : "kWh",
       "pulse_counter" : 2173327,
       "value" : 2173.327
   }


Query current configuration and state of all physical channels
--------------------------------------------------------------

.. code-block:: shell

   curl -v http://192.168.178.191/api/channel/physical/io

.. code-block:: none

   * Hostname was NOT found in DNS cache
   *   Trying 192.168.178.191...
   * Connected to 192.168.178.191 (192.168.178.191) port 80 (#0)
   > GET /api/channel/physical/io HTTP/1.1
   > User-Agent: curl/7.35.0
   > Host: 192.168.178.191
   > Accept: */*
   >
   * HTTP 1.0, assume close after body
   < HTTP/1.0 200 OK
   < Server: lwIP/1.4.1
   < Access-Control-Allow-Origin: *
   < Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS
   < Access-Control-Allow-Headers: Content-Type
   < Content-Length: 1056
   < Content-Type: application/json
   < Pragma: no-cache
   <
   * Closing connection 0

.. code-block:: json

   {
       "1" : {
           "label" : "Channel 1",
           "supported_types" : ["di", "do", "ai", "s0"],
           "type" : "s0",
           "enabled" : 1,
           "pulses_per_unit" : 1000,
           "unit" : "kWh",
           "pulse_counter" : 2173327,
           "value" : 2173.327
       },
       "2" : {
           "label" : "Channel 2",
           "supported_types" : ["di", "do", "ai", "s0"],
           "type" : "di",
           "enabled" : 1,
           "mode" : "normal",
           "pullup" : 1,
           "virtual_channel" : 0,
           "level" : "direct",
           "value" : 1
       },
       "3" : {
           "label" : "Channel 3",
           "supported_types" : ["di", "do", "ai", "s0"],
           "type" : "di",
           "enabled" : 1,
           "mode" : "normal",
           "pullup" : 0,
           "virtual_channel" : 0,
           "level" : "direct",
           "threshold" : 0,
           "value" : 0
       },
       "4" : {
           "label" : "Channel 4",
           "supported_types" : ["di", "do", "ai", "s0"],
           "type" : "do",
           "enabled" : 1,
           "mode" : "normal",
           "virtual_channel" : 0,
           "level" : "direct",
           "delay_on" : 0,
           "delay_off" : 0,
           "value" : 0
       },
       "5" : {
           "label" : "Channel 5",
           "supported_types" : ["di", "do", "ai", "s0"],
           "type" : "do",
           "enabled" : 1,
           "mode" : "normal",
           "virtual_channel" : 0,
           "level" : "direct",
           "delay_on" : 0,
           "delay_off" : 0,
           "value" : 0
       },
       "6" : {
           "label" : "Channel 6",
           "supported_types" : ["di", "do", "ai", "s0"],
           "type" : "ai",
           "enabled" : 1,
           "mode" : "0-10 V",
           "virtual_channel" : 0,
           "threshold" : 0,
           "normalized_value" : 0,
           "value" : 0.000,
           "unit" : "V"
       }
   }


Query only current state of all physical channels
-------------------------------------------------

This is an example of an optimized query, where only current state properties
are retrieved.

.. code-block:: shell

   curl -v http://192.168.178.191/api/channel/physical/io?filter=config

.. code-block:: none

   * Hostname was NOT found in DNS cache
   *   Trying 192.168.178.191...
   * Connected to 192.168.178.191 (192.168.178.191) port 80 (#0)
   > GET /api/channel/physical/io?filter=config HTTP/1.1
   > User-Agent: curl/7.35.0
   > Host: 192.168.178.191
   > Accept: */*
   >
   * HTTP 1.0, assume close after body
   < HTTP/1.0 200 OK
   < Server: lwIP/1.4.1
   < Access-Control-Allow-Origin: *
   < Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS
   < Access-Control-Allow-Headers: Content-Type
   < Content-Length: 164
   < Content-Type: application/json
   < Pragma: no-cache
   <
   * Closing connection 0

.. code-block:: json

   {
       "1" : {
           "pulse_counter" : 2173327,
           "value" : 2173.327
       },
       "2" : {
           "value" : 1
       },
       "3" : {
           "value" : 0
       },
       "4" : {
           "value" : 0
       },
       "5" : {
           "value" : 0
       },
       "6" : {
           "normalized_value" : 0,
           "value" : 0.000,
           "unit" : "V"
       }
   }


Python example
~~~~~~~~~~~~~~

The following Python example relies on the `Python requests library`_.
It assumes that you already configured a given channel on your XPL Rail device
as digitial output and allows to switch such a channel on or off.
Intended as example, it does not do much error checking - this is left as an exercise to the reader ;-)

.. _Python requests library: http://docs.python-requests.org/en/master/

.. literalinclude:: xpl-on-off.py
   :language: python
   :linenos:

PHP example
~~~~~~~~~~~

The following example written in PHP uses a raw socket to connect to an XPL Rail.
It assumes that you already configured a given channel on your XPL Rail device
as digitial output and allows to switch such a channel on or off.
Here too, there is no much error checking and you should really use some library.

.. literalinclude:: xpl-on-off.php
   :language: php
   :linenos:

JavaScript/NodeJS example
~~~~~~~~~~~~~~~~~~~~~~~~~

The following example is written in JavaScript. You can embedd it within a custom
web page, or use it in a NodeJS server environment.
It also assumes that you already configured a given channel on your XPL Rail device
as digitial output and allows to switch such a channel on or off.

.. literalinclude:: xpl-on-off.js
   :language: js
   :linenos:
