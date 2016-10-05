JSON property details
=====================

Physical channels
-----------------

As stated above, a physical channel is of a dedicated **class** and has an unique **id**.
These both properties/attributes uniquely identify this channel.
The channel id is defined as a unsigned integer value in the range 1-65535, because
humans tend to number the natural way, e.g. starting with 1 and thus expecting
the device label to number the first serial interface with 1, not as 0. So by
definition, a physical channel of 0 is none-existent.

As already described above, the channel **class** has only two valid values:
``io`` and ``serial``.

The possible physical channel **types** depend on the physical channel class:

  * for class ``serial``: this is one of the strings ``rs485``, ``rs422``, ``rs232``, ``can``, ``mbus``, ``wmbus``, ``enocean``
  * for class ``io``: this is one of the strings ``di``, ``do``, ``s0``, ``ai``, ``ao``

The possible physical channel **modes** depends on the physical channel class and type:

  * for class ``io``:

      - type ``di``: ``normal``, ``flipflop``
      - type ``do``: ``normal``, ``pulse``
      - type ``ai``: ``0-10 V``, ``1-10 V``, ``0-20 mA``, ``4-20 mA``
      - type ``ao``: ``0-10 V``, ``1-10 V``

  * for class ``serial``:

    This is a integer, where each bit reflects whether a given service is
    enabled for this physical serial channel.

The property **label** is common to all physical channels, all other properties
depend on the channel type and the hardware capabilities of the individual
channel. The following list is an overview of the actual available properties:

class
  **Property class**: structural

  **Availability**: always

  **JSON datatype**: string

  **Description**: Channel class, that is ``serial`` or  ``io``.

id
  **Property class**: structural

  **Availability**: always

  **JSON datatype**: number

  **Description**: Channel's unique ID (1-65535).

label
  **Property class**: config

  **Availability**: always

  **JSON datatype**: string

  **Description**: User-defined name/label to associate the channel with, used e.g.
  in the web frontend. Up to 16 characters (bytes) can be stored.

enabled
  **Property class**: config

  **Availability**: class ``serial`` or class ``io``

  **JSON datatype**: number

  **Description**: Indicator whether this channel is used at all.

virtual_channel
  **Property class**: config

  **Availability**: class ``serial`` or class ``io``

  **JSON datatype**: number

  **Description**: The virtual channel id of the linked virtual channel; zero
  by default, which menas that no virtual channel is assigned.

type
  **Property class**: config

  **Availability**: class ``serial`` or class ``io``

  **JSON datatype**: string

  **Description**: Channel type (depends on ``class``, see above).

supported_types
  **Property class**: config

  **Availability**: class ``serial`` or class ``io``

  **JSON datatype**: array

  **Description**: This array contains a list of strings which reports the hardware capabilities
  of the corresponding channel. This depends on the XPL device variant. The strings in this list
  are valid strings for the ``type`` property.

mode
  **Property class**: config

  **Availability**: class ``serial`` or class ``io``

  **JSON datatype**: string

  **Description**: Operation mode (depends on ``class`` and ``type``, see above).

pullup
  **Property class**: config

  **Availability**: class ``io`` and type ``di``

  **JSON datatype**: number

  **Description**: Disable/enable an internal pull-up resistor on this channel.
  At the moment, the only valid values are ``0`` or ``1``.

level
  **Property class**: config

  **Availability**: class ``io`` and ((type ``di`` and mode ``normal``) or (type ``do``))

  **JSON datatype**: string

  **Description**: Value ``direct`` means, that a HIGH level on the wire is
  mapped to logical 1 (aka *active high*); whereas ``inverted`` means the that
  HIGH level is mapped to logical 0 (aka *active low*).

edge
  **Property class**: config

  **Availability**: class ``io`` and type ``di`` and mode ``flipflop``

  **JSON datatype**: string

  **Description**: Edge of the signal to trigger: ``falling`` or ``rising``.

delay_on
  **Property class**: config

  **Availability**: class ``io`` and type ``do``

  **JSON datatype**: number

  **Description**: Delay on time (in ms).

delay_off
  **Property class**: config

  **Availability**: class ``io`` and type ``do`` and mode ``normal``

  **JSON datatype**: number

  **Description**: Delay off time (in ms).

width
  **Property class**: config

  **Availability**: class ``io`` and type ``do`` and mode ``pulse``

  **JSON datatype**: number

  **Description**: Pulse width (in ms).

threshold
  **Property class**: config

  **Availability**: class ``io`` and ((type ``ai``) or (type ``di`` and pullup ``0``))

  **JSON datatype**: number

  **Description**: Voltage level (normalized 16-bit value) to detect the
  input as logical 1.

pulses_per_unit
  **Property class**: config

  **Availability**: class ``io`` and type ``s0``

  **JSON datatype**: number

  **Description**: User-supplied value to calculate the current energy reading.

unit
  **Property class**: config (for class ``io`` and type ``s0``), state else

  **Availability**: class ``io`` and (type ``s0`` or type ``ai`` or type ``ao``)

  **JSON datatype**: string

  **Description**: For a channel configured as S0 input, this is a user-supplied
  string up to 16 characters (bytes);
  for an channel configured as analog input, this is a fixed string ``mA`` or
  ``V`` depending on the physical capabilities/configuration of the channel.

value
  **Property class**: state (for class ``io`` and type ``s0`` additionally config)

  **Availability**: class ``io``

  **JSON datatype**: number

  **Description**: This is the current/actual value of this channel. For an
  analog or S0 channel, this is a floating point number which must be
  interpreted together with ``unit``; for a digital channel, this can only
  have the values ``0`` or ``1``.

  Note: When configuring a S0 channel and both ``pulse_counter`` and ``value``
  are contained within the request, then both values must correspond to each
  other, otherwise the request will fail.

normalized_value
  **Property class**: state

  **Availability**: class ``io`` and (type ``ai`` or type ``ao``)

  **JSON datatype**: number

  **Description**: This is the current/actual value of this channel, mapped
  into a 16-bit value, i.e. 0-65535. This way it is possible to
  interconnect different analog types.

pulse_counter
  **Property class**: state and config

  **Availability**: class ``io`` and type ``s0``

  **JSON datatype**: number

  **Description**: Contains the raw value of the internal impulse counter.
  Note: When configuring a S0 channel and both ``pulse_counter`` and ``value``
  are contained within the request, then both values must correspond to each
  other, otherwise the request will fail.

baudrate
  **Property class**: config

  **Availability**: class ``serial``

  **JSON datatype**: number

  **Description**: Baudrate of the channel. It depends on the actual device,
  which baudrates are possible at all.

databits
  **Property class**: config

  **Availability**: class ``serial``

  **JSON datatype**: number

  **Description**: Count of databits of the channel. It depends on the actual
  device capabilities, which values are supported. At the moment, this can
  only be ``7`` or ``8``.

parity
  **Property class**: config

  **Availability**: class ``serial``

  **JSON datatype**: string

  **Description**: Parity setting of the channel, that is ``none``, ``odd`` or
  ``even``. Note, that not all combinations with *databits* and/or *stopbits*
  might be possible, depending on the actual device capabilities.

stopbits
  **Property class**: config

  **Availability**: class ``serial``

  **JSON datatype**: number

  **Description**: Count of stop bits used at the channel. Note, that not all
  combinations with *databits* and/or *stopbits* might be possible, depending
  on the actual device capabilities. For example, for all current XPL devices,
  this is required to be ``1``.

port
  **Property class**: config

  **Availability**: class ``serial``

  **JSON datatype**: number

  **Description**: Port number of TCP raw socket server or Telnet server
  bound to this channel.

idle_timeout
  **Property class**: config

  **Availability**: class ``serial``

  **JSON datatype**: number

  **Description**: Idle time after which a TCP/Telnet connection is terminated
  automatically.

flags
  **Property class**: config

  **Availability**: class ``serial``

  **JSON datatype**: Array of strings

  **Description**: Array which contains various flags of the physical serial
  channel:

    - ``sw_mode``: The operation mode (*type*) is software switchable (e.g.
      RS-232 vs. RS-485). Whether this is supported depends on the actual
      XPL device.

    - ``sw_ctrl_local``: The settings *baudrate*, *databits*, *parity* and
      *stopbits* can be configured via web frontend of the XPL device.

      .. note::

         A configured Telnet server on this physical channel still negotiates
         RFC2217 in this case; however, requests to change the port settings
         are silently ignored. A client can detect this situation when
         requesting a change and still reading back the old settings afterwards.

    - ``sw_ctrl_remote``: Defaults for *baudrate*, *databits*, *parity* and
      *stopbits* can be configured via web frontend and take effect right after
      power on of the XPL or after reboot. But it is possible for a
      RFC2217-enabled client to switch these settings at run-time.

stats
  **Property class**: state

  **Availability**: class ``serial``

  **JSON datatype**: Object

  **Description**: Statistics counter of corresponding UART.

active_connection
  **Property class**: state

  **Availability**: class ``serial``

  **JSON datatype**: Object

  **Description**: This object is present only, when a client is connected to
  the corresponding channel server (e.g. Telnet server). Then it contains
  various information about the connected client.

.. note::

  The physical channel class ``serial`` does not has any property *value* as
  there is no buffering and the data stream is considered as a transient state.
  That means, that it is not possible to read any actual data upon request,
  but only receive a notification when data is transferred.



Virtual channels
----------------

As stated above, a virtual channel has an unique **id**. The next important
property/attribute is the channel **type**, which can be ``digitial``,
``analog``, or ``serial``. (On database jargon, this is tuple (type, id) is
the unique primary key.)

All other channel properties depend on the channel type as describe in the
following list:

id
  **Property class**: structural

  **Availability**: always

  **JSON datatype**: number

  **Description**: Channel's unique ID (1-65535).

type
  **Property class**: structural

  **Availability**: always

  **JSON datatype**: number

  **Description**: Virtual channel type, i.e. ``digital``, ``analog`` or ``serial``.

value
  **Property class**: state

  **Availability**: type ``digital`` or type ``analog``

  **JSON datatype**: number

  **Description**: This is the current/actual value of this channel. See description
  for physical channel property *value* for details.

unit
  **Property class**: state

  **Availability**: type ``analog``

  **JSON datatype**: string

  **Description**: This is an inherited property of the physical channel which
  feeds this virtual channel.

normalized_value
  **Property class**: state

  **Availability**: type ``analog``

  **JSON datatype**: string

  **Description**: This is the current/actual value of this channel, normalized
  to an unsigned 16-bit value (0-65535).

stats
  **Property class**: state

  **Availability**: type ``serial``

  **JSON datatype**: Object

  **Description**: Statistics counter for the virtual serial channel.



.. _device_information:

Device information
------------------

The device information JSON object consists of some properties which describe details
of the XPL device. For this object, no property classes are implemented.

This JSON object has the following read-only properties:

product
  **JSON datatype**: string

  **Description**: Contains the product code of this device.

modelname
  **JSON datatype**: string

  **Description**: Contains the modell name string of this device.

hardware_version
  **JSON datatype**: string

  **Description**: Contains the hardware version string of this device.

software_version
  **JSON datatype**: string

  **Description**: Contains the software version string of this device.

hostname
  **JSON datatype**: string

  **Description**: Contains the software version string of this device.

mac_address
  **JSON datatype**: string

  **Description**: Contains the MAC address of the main processor of this device.

mac_address_plc
  **JSON datatype**: string

  **Description**: Contains the MAC address of the powerline processor of this device.

serial
  **JSON datatype**: string

  **Description**: Contains the serial number of this device.

uuid
  **JSON datatype**: string

  **Description**: Contains the devices's UUID. This UUID is generated based on a unique
  serial number of the embedded microcontroller and the MAC address of this device.



.. _powerline_network:

Powerline Network Details
-------------------------

The powerline network JSON object consists of some properties which describe details
of the powerline network. For this object, no property classes are implemented.

This JSON object has the following properties:

nid
  **JSON datatype**: string

  **Availability**: always

  **Description**: Contains the hexadecimal representation of the powerline network identifier.

short_network_id
  **JSON datatype**: number

  **Availability**: always

  **Description**: Contains the short network id of powerline network.

cco
  **JSON datatype**: object

  **Availability**: always

  **Description**: Contains information about the current powerline's central coordinator.
  This object has the following properties itself:

  mac_address
    **JSON datatype**: string

    **Availability**: always

    **Description**: Contains the MAC address of the current CCo.


  tei
    **JSON datatype**: number

    **Availability**: always

    **Description**: Contains the terminal equipment number of the current CCo.

result
  **JSON datatype**: number

  **Availability**: after remote pairing action

  **Description**: Only present, when a remote pairing operation was triggered.
  Represents the result of this operation, i.e. it contains zero
  as long as the operation is not completed or was not successfully, see below.

While the properties above are read-only, this object allows to add a remote device
via DAK (Device Access Key) to the powerline network. For this, issue a PUT request
to this object and provide a JSON object consisting of a single 'dak' property
which contains the DAK string of the device to add. Note, that a simple DAK string
is converted XPL internally to it's binary representation which is the common
use-case. However, it's also possible to give a hexadecimal string representation
of the DAK - in this case, it is used as is.

.. code-block:: none

    PUT /api/powerline/network HTTP/1.1
    Content-Length: 38
    Content-Type: application/json
    Accept: application/json

    {
        "dak": "ABCD-EFGH-IJKL-MNOP"
    }

After this HTTP request, the XPL device will begin to perform the requested
action by sending out a HomePlug AV packet to its powerline processor. Once
this packet is sent, the powerline network JSON object will contain the ''result''
property. In other words, this property does not show up immediately, but it can
take a short time (typically less than 1 s). The value of this property is zero
at the beginning which means that the operation was not successfully. However,
it may take some time until success is reported from lower protocol stack. In this
case, the value of the property becomes 1.
So it's recommended to issue the PUT request, wait some seconds (e.g. 30s) and then
query the operation result with a GET request.



.. _powerline_local:

Powerline Local Device Details
------------------------------

This JSON object contains data of the XPL device's powerline controller.

mac_address
  **JSON datatype**: string

  **Description**: Contains the hexadecimal representation of the powerline
  controller's MAC address.

tei
  **JSON datatype**: number

  **Description**: Contains the terminal equipment number of the device within
  the powerline network.

chipset
  **JSON datatype**: string

  **Description**: Contains the chipset name.

fw_version
  **JSON datatype**: string

  **Description**: Contains the firmware version string of the powerline chipset.

usr
  **JSON datatype**: string

  **Description**: Contains the user string of the powerline PIB.

mfg
  **JSON datatype**: string

  **Description**: Contains the manufacturer string of the powerline PIB.

dak
  **JSON datatype**: string

  **Description**: Contains the hexadecimal representation of the powerline
  controller's DAK (Device Access Key).

nmk
  **JSON datatype**: string

  **Description**: Contains the hexadecimal representation of the powerline's
  network management keys.

is_cco:
  **JSON datatype**: number

  **Description**: When the current XPL device has the CCo role of the powerline
  network, then this property is present and contains one. If not, then this
  property has the value zero and is obmitted.

The properties above are all read-only, except the ''nmk'' property: issuing a
PUT request to it allows to associate to another powerline network:

.. code-block:: none

    PUT /api/powerline/local HTTP/1.1
    Content-Length: 41
    Content-Type: application/json
    Accept: application/json

    {
        "nmk": "SecretPowerlineNetwork"
    }

Note, that a simple NMK string is converted XPL internally to it's binary
representation which is the usual use-case. However, it's also possible to
give a hexadecimal string representation of the NMK - in this case, it is used
as is:

.. code-block:: none

    PUT /api/powerline/local HTTP/1.1
    Content-Length: 66
    Content-Type: application/json
    Accept: application/json

    {
        "nmk": "B2:C5:1F:63:4E:43:A9:D4:B9:0F:DF:61:C4:ED:90:DD"
    }

After this HTTP request, the XPL device will begin to perform the requested
action by sending out a HomePlug AV packet to its powerline processor. Once
this packet is sent, the powerline network JSON object will contain the ''result''
property. In other words, this property does not show up immediately, but it can
take a short time (typically less than 1 s). The value of this property is zero
at the beginning which means that the operation was not successfully. However,
it may take some time until success is reported from lower protocol stack. In this
case, the value of the property becomes 1.
So it's recommended to issue the PUT request, wait some seconds (e.g. 30s) and then
query the operation result with a GET request.

This JSON object also allows further actions being performed on the XPL device.
For this you have to issue a PUT request which consists of a single JSON object
with a string property called ''action''. The possible actions are listed below:

+------------------+------------------------------------------------------------+
| Value            | Action performed                                           |
+==================+============================================================+
| factory_defaults | This resets the powerline chipset to its factory defaults. |
+------------------+------------------------------------------------------------+
| randomize_nmk    | This assigns a random network management key to the XPL    |
|                  | device, or -in other words- leave the current powerline    |
|                  | network.                                                   |
+------------------+------------------------------------------------------------+
| pbsc             | Performs Push Button Simple Connect.                       |
|                  | This is equivalent to physically pressing the Push Button  |
|                  | at the front panel of the XPL device. See user manual      |
|                  | for details.                                               |
+------------------+------------------------------------------------------------+

Example: The following PUT request resets the powerline chipset to its
factory defaults:

.. code-block:: none

    PUT /api/powerline/local HTTP/1.1
    Content-Length: 38
    Content-Type: application/json
    Accept: application/json

    {
        "action": "factory_defaults"
    }



.. _powerline_stations:

Powerline Station Details
-------------------------

This JSON object represents a powerline station within the current powerline network.
Please note, that detail informations of the other devices must be collected by
quering these devices. This may take some time, and also not all devices of other
manufacturers will report all requested information. Thus some properties might
be missing for single stations.

This object is read-only, no actions can be performed on the list and/or list entries.

tei
  **JSON datatype**: number

  **Availability**: always

  **Description**: Contains the terminal equipment number of the station.

mac_address
  **JSON datatype**: string

  **Availability**: always

  **Description**: Contains the MAC address of the station.

avg_data_rate
  **JSON datatype**: object

  **Availability**: always

  **Description**: Contains average data rates as seen by the XPL device.
  This object has the following properties itself:

  rx
    **JSON datatype**: number

    **Availability**: always

    **Description**: Average receive data rate.

  tx
    **JSON datatype**: number

    **Availability**: always

    **Description**: Average transmit data rate.

chipset
  **JSON datatype**: string

  **Availability**: optional

  **Description**: Contains the chipset name of the station's powerline chipset.

fw_version
  **JSON datatype**: string

  **Availability**: optional

  **Description**: Contains the firmware version string of the station's powerline chipset.

usr
  **JSON datatype**: string

  **Availability**: optional

  **Description**: Contains the user string of the station's powerline PIB.

mfg
  **JSON datatype**: string

  **Availability**: optional

  **Description**: Contains the manufacturer string of the station's powerline PIB.

is_cco:
  **JSON datatype**: number

  **Availability**: optional

  **Description**: When this station has the CCo role of the powerline
  network, then this property is present and contains one. If not, then this
  property has the value zero and is obmitted.

neighbor:
  **JSON datatype**: string

  **Availability**: optional

  **Description**: When this station is an XPL device and has a neighbor entry,
  then this property contains the MAC address of the corresponding neighbor
  list item.



.. _powerline_neighbors:

Neighbor Details
----------------

This JSON object stores detail information about detected XPL neighbor devices, i.e.
other XPL devices found in the same powerline network.

Such other XPL devices - called neighbor - are represented as key-value pair,
where the name of the key is the MAC address of the neighbors main processor, and
the value is a JSON object with detail information.

Such a neighbor JSON detail object has the following properties:

product
  **Property class**: -

  **JSON datatype**: string

  **Availability**: always

  **Description**: Contains the product code of this neighbor.

hardware_version
  **Property class**: details

  **JSON datatype**: string

  **Availability**: always

  **Description**: Contains the hardware version string of this neighbor.

software_version
  **Property class**: details

  **JSON datatype**: string

  **Availability**: always

  **Description**: Contains the software version string of this neighbor.

hostname
  **Property class**: -

  **JSON datatype**: string

  **Availability**: always

  **Description**: Contains the software version string of this device.

mac_address
  **Property class**: details

  **JSON datatype**: string

  **Availability**: always

  **Description**: Contains the MAC address of the main processor of this neighbor.

serial
  **Property class**: -

  **JSON datatype**: string

  **Availability**: always

  **Description**: Contains the serial number of this neighbor.

ip_address
  **Property class**: -

  **JSON datatype**: string

  **Availability**: always

  **Description**: Contains the neighbors's current IPv4 address.

This JSON object is read-only, no actions can be performed on the object itself
and/or sub-objects.
