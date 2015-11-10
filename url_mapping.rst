RESTful URL mapping
===================

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
