RESTful URL mapping
===================

Physical/virtual channels
-------------------------

Since our basic concept to access the device are channels, the both channel classes are
reachable with ``http://<device>/api/channel/physical`` resp. ``http://<device>/api/channel/virtual``.

So this results in the following URLs (for a device with 2 IO port, 1 CAN interface and 1 RS-232):

  * ``http://<device>/api/channel/physical``
  * ``http://<device>/api/channel/physical/io``
  * ``http://<device>/api/channel/physical/io/1``
  * ``http://<device>/api/channel/physical/io/2``
  * ``http://<device>/api/channel/physical/serial``
  * ``http://<device>/api/channel/physical/serial/1``
  * ``http://<device>/api/channel/physical/serial/2``

Or in other words:

``http://<device>/api/channel/physical/{physical_channel_class}/{physical_channel_id}``

The physical URL space is always available since it reflects the hardware of a device, thus providing a way
to configure the hardware and to determine its capabilities. The user has always the possibility to access an
dedicated individual object or to query 'all' objects within the requested class.

The available virtual URL space depends on the configuration of the device:

  * ``http://<device>/api/channel/virtual/{virtual_channel_type}/{virtual_channel_id}``

e.g.

  * ``http://<device>/api/channel/virtual/digital/1``
  * ``http://<device>/api/channel/virtual/analog/4711``
  * ``http://<device>/api/channel/virtual/serial/19``

Please note, that accessing e.g. ``http://<device>/api/channel/virtual`` includes all JSON objects
which could also be accessed individually via their own URL.

.. note::

   As mentioned before, this is not true for ``http://<device>/api``, as this URL is handled special.


Device information
------------------

Beside the data about channels etc., there is another API entry point to obtain data about the
XPL device itself. This information is read-only and can be queried by a GET request to the URL:
``http://<device>/api/device``

The JSON response looks like:

.. code-block:: none

    {
        "product": "I2XPLR4-IO600",
        "modelname": "XPL Rail",
        "hardware_version": "1.0",
        "software_version": "0.12",
        "hostname": "xpltest2",
        "mac_address": "00:01:87:FF:FF:27",
        "mac_address_plc": "00:01:87:FF:FF:26",
        "serial": "0000004711",
        "uuid": "444d5314-1000-4400-9500-000187ffff27"
    }

A details description of this JSON object is given in section :ref:`device_information`.

Powerline network status/configuration
--------------------------------------

As the XPL devices are powerline devices, it's possible to obtain some details of the powerline network
from the device and to trigger some powerline related actions. This information is bundled in the
''/api/powerline'' hierarchy, which consists of four sub-elements:

  * ``http://<device>/api/powerline/network``
  * ``http://<device>/api/powerline/local``
  * ``http://<device>/api/powerline/stations``
  * ``http://<device>/api/powerline/neighbors``

The ''network'' property is an object which contains information about the powerline network itself.
Details are explained in :ref:`powerline_network`.

The ''local'' property is a an object which contains detailed information about the current device's
powerline controller, see :ref:`powerline_local`.

The ''stations'' property is a an list of detected remote powerline stations.
Each list entry is a powerline station object, described in :ref:`powerline_stations`.

The ''neighbor'' property is a an object which accumulates all XPL neighbors, i.e.
other XPL devices found in the same powerline network. See :ref:`powerline_neighbors`.
