HTTP verbs
==========

The RESTful approach strives to use appropriate HTTP verbs for each action. For a
marjoram device, this only make limited sense: we have a fixed number of physical
channels which can be configured and/or their state can be queried. However, it is
not possible to delete and or create such a physical channel.

It important to realize, that only physical channels can be configured. The properties
of virtual channels, or the existence of virtual channels at all, is always the
result of the configuration of a physical channel.
While querying properties of virtual channels is a valid access pattern, a
configuration of a virtual channel is not possible.

According to the REST paradigm, querying REST objects is done via HTTP GET requests.
Modifying a REST object is normally done with PUT method. On a marjoram device,
PUT and POST methods are handled equally.

So, to configure a dedicated physical channel, issue a PUT request to its URL.

Example to configure physical io channel 2: ``http://<device>/api/channel/physical/io/2``

.. code-block:: none

    PUT /api/channel/physical/io/2 HTTP/1.1
    Content-Length: 165
    Content-Type: application/json
    Accept: application/json
    
    {
        "label": "My Label 2",
        "type": "do",
        "mode": "normal",
        "virtual_channel": 17,
        "level": "inverted",
        "delay_on": 0,
        "delay_off": 0,
    }

On success, you will receive a JSON object in the same manner, as a GET request would give you, already
with the updated configuration. If an error occurs, you'll get a JSON error object, see below for details.
