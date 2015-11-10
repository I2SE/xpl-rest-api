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

  * for class ``serial``:

    This is a integer, where each bit reflects whether a given service is
    enabled for this physical serial channel.

The property **label** is common to all physical channels, all other properties
depend on the channel type and the hardware capabilities of the individual
channel. The following list is an overview of the actual available properties:

.. tabularcolumns:: |L|L|C|L|L|

+-------------------+--------------+-------------------------------------------------------------------------+---------------------------------------------------------------------------+
|     Property      |  Property    | Available for channel class                                             | Description                                                               |
|                   |  class       +--------+----------------------------------------------------------------+                                                                           |
|                   |              | serial | io                                                             |                                                                           |
+===================+==============+========+================================================================+===========================================================================+
| class             | structural   | yes    | yes                                                            | Channel class (``serial``, ``io``)                                        |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| id                | structural   | yes    | yes                                                            | Channel's unique ID (1-65535).                                            |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| label             | config       | yes    | yes                                                            | User-defined channel name/label                                           |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| enabled           | config       | yes    | yes                                                            | Indicator whether this channel is used at all.                            |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| virtual_channel   | config       | yes    | yes                                                            | The virtual channel id of the linked virtual channel, zero by default     |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| type              | config       | yes    | yes                                                            | Channel type (depends on class, see above)                                |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| mode              | config       | yes    | yes                                                            | Operation mode (depends on class and type, see above)                     |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| pullup            | config       | no     | only when type is ``di``                                       | 0 or 1, to disable/enable an internal pull-up resistor on this channel    |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| level             | config       | no     | only when type is ``di`` and mode is ``normal``, or type       | ``direct`` or ``inverted``                                                |
|                   |              |        | is ``do``                                                      |                                                                           |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| edge              | config       | no     | only when type is ``di`` and mode is ``flipflop``              | Trigger edge: ``falling`` or ``rising``                                   |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| delay_on          | config       | no     | only when type is ``do``                                       | Delay on time (in ms)                                                     |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| delay_off         | config       | no     | only when type is ``do`` and mode is ``normal``                | Delay off time (in ms)                                                    |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| width             | config       | no     | only when type is ``do`` and mode is ``pulse``                 | Pulse width (in ms)                                                       |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| threshold         | config       | no     | only when type is ``ai``, or type is ``di`` and pullup is      | Voltage level (normalized 16-bit value) to detect the input as logical 1. |
|                   |              |        | disabled                                                       |                                                                           |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| offset            | config       | no     | only when type is ``s0``                                       | User-supplied value to calculate the current energy reading.              |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| pulses_per_unit   | config       | no     | only when type is ``s0``                                       | User-supplied value to calculate the current energy reading.              |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| unit              | config/state | no     | only when type is ``ai`` or type is ``s0``                     | For ``s0`` this is a user-supplied string, fixed ``mA`` or                |
|                   |              |        |                                                                | ``V`` otherwise.                                                          |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| value             | state        | no     | yes                                                            | This is the current/actual value of this channel.                         |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| normalized_value  | state        | no     | only when type is ``ai``                                       | Current channel value mapped into a 16-bit value, i.e. 0-65535            |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| raw_value         | state        | no     | only when type is ``s0``                                       | Contains the raw value of the internal impulse counter                    |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| baudrate          | config       | yes    | no                                                             | Current baudrate                                                          |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| databits          | config       | yes    | no                                                             | Current count of databits (integer; 7 or 8)                               |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| parity            | config       | yes    | no                                                             | Current parity (string; ``none``, ``odd``, ``even``)                      |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| stopbits          | config       | yes    | no                                                             | Current count of stopbits (integer; 1)                                    |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| port              | config       | yes    | no                                                             | Port number of TCP raw socket or Telnet server bound to this channel      |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| idle_timeout      | config       | yes    | no                                                             | Idle time after which a TCP/Telnet connection is terminated automatically |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| flags             | config       | yes    | no                                                             | Array which contains various flags of the physical serial channel:        |
|                   |              |        |                                                                |                                                                           |
|                   |              |        |                                                                |   - ``sw_mode``: operation mode (*type*) is software switchable (e.g.     |
|                   |              |        |                                                                |     RS-232 vs. RS-485)                                                    |
|                   |              |        |                                                                |   - ``sw_ctrl_local``: baudrate, databits, parity and stopbits can be     |
|                   |              |        |                                                                |     configured via web frontend                                           |
|                   |              |        |                                                                |   - ``sw_ctrl_remote``: defaults for baudrate, databits, parity and       |
|                   |              |        |                                                                |     stopbits can be configured via web frontend and                       |
|                   |              |        |                                                                |     it's possible to switch these settings via                            |
|                   |              |        |                                                                |     RFC2217 by a connected client                                         |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| stats             | state        | yes    | no                                                             | Statistics counter of corresponding UART                                  |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+
| active_connection | state        | yes    | no                                                             | optional, Information about connected client of the TCP/Telnet server     |
+-------------------+--------------+--------+----------------------------------------------------------------+---------------------------------------------------------------------------+

.. note::

  The physical channel class ``serial`` does not has any property *value* as there is
  no buffering and the data stream is considered as a transient state. That means, that it is not possible
  to read any actual data upon request, but only receive a notification when data is transferred.


Virtual channels
----------------

As stated above, a virtual channel has an unique **id**. The next important property/attribute
is the channel **type**, which can be ``digitial``, ``analog``, or ``serial``.
(On database jargon, this is tuple (type, id) is the unique primary key.)
All other channel properties depend on the channel type as describe in the following table:

+------------------+------------+------------------------------+-----------------------------------------------------------------------------------------------------+
| Property         |  Property  | Available for channel type   | Description                                                                                         |
|                  |  class     +---------+--------+-----------+                                                                                                     |
|                  |            | digital | analog | serial    |                                                                                                     |
+==================+============+=========+========+===========+=====================================================================================================+
| id               | structural | yes     | yes    | yes       | Channel's unique ID (1-65535)                                                                       |
+------------------+------------+---------+--------+-----------+-----------------------------------------------------------------------------------------------------+
| type             | structural | yes     | yes    | yes       | Channel type (``digital``, ``analog``, ``serial``)                                                  |
+------------------+------------+---------+--------+-----------+-----------------------------------------------------------------------------------------------------+
| value            | state      | yes     | yes    | no        | This is the current/actual value of this channel                                                    |
+------------------+------------+---------+--------+-----------+-----------------------------------------------------------------------------------------------------+
| unit             | state      | no      | yes    | no        | This is an inherited property of the physical channel which feeds this virtual channel.             |
+------------------+------------+---------+--------+-----------+-----------------------------------------------------------------------------------------------------+
| normalized_value | state      | no      | yes    | no        | This is the current/actual value of this channel, normalized to an unsigned 16-bit value (0-65535). |
+------------------+------------+---------+--------+-----------+-----------------------------------------------------------------------------------------------------+
| stats            | state      | no      | no     | yes       | Statistics counter for the virtual serial channel                                                   |
+------------------+------------+---------+--------+-----------+-----------------------------------------------------------------------------------------------------+
