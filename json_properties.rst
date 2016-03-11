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
  in the web frontend.

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

offset
  **Property class**: config

  **Availability**: class ``io`` and type ``s0``

  **JSON datatype**: number

  **Description**: User-supplied value to calculate the current energy reading.

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
  string; for an channel configured as analog input, this is a fixed string
  ``mA`` or  ``V`` depending on the physical capabilities/configuration of
  the channel.

value
  **Property class**: state

  **Availability**: class ``io``

  **JSON datatype**: number

  **Description**: This is the current/actual value of this channel. For an
  analog or s0 channel, this is a floating point number which must be
  interpreted together with ``unit``; for a digital channel, this can only
  have the values ``0`` or ``1``.

normalized_value
  **Property class**: state

  **Availability**: class ``io`` and (type ``ai`` or type ``ao``)

  **JSON datatype**: number

  **Description**: This is the current/actual value of this channel, mapped
  into a 16-bit value, i.e. 0-65535. This way it is possible to
  interconnect different analog types.

raw_value
  **Property class**: state

  **Availability**: class ``io`` and type ``s0``

  **JSON datatype**: number

  **Description**: Contains the raw value of the internal impulse counter.

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
