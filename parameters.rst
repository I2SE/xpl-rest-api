Parameters
==========

When querying a RESTful object, it's possible to filter out and/or request properties of the object.
For this, a **property class** has been assigned to each property.
At the momemt, there exists *structual*, *config* and *state*.

The default object view includes the classes *config* and *state*, but hides *structural*.
You get this default view when you do not supply any of the following, optional parameters.

+-----------+-----------------------------------+----------------------------------------------------------+
| Parameter | Value                             | Meaning                                                  |
+===========+===================================+==========================================================+
| filter    | *structural*, *config* or *state* | This *hides* the properties of the given class.          |
+-----------+-----------------------------------+----------------------------------------------------------+
| unfilter  | *structural*, *config* or *state* | This forces the properties of the given class to appear. |
+-----------+-----------------------------------+----------------------------------------------------------+

So for example to only query the current states of all physical channels, issue the following
GET request:

  $ curl http://192.168.55.57/api/channel/physical?filter=config

Another use case could be to retrieve the whole physical channel configuration (configuration backup):

  $ curl http://192.168.55.57/api/channel/physical?filter=state
