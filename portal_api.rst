Terminology
===========

local network
    The ethernet / poweline network inside a users home.

local device
    The Internet of Things device that is installed in a local network.

portal
    A server in the internet that can be used to get the IPv4 address of the local device.

client
    A device (like a PC, Smartphone) that wants to connect to the local device.

Problem to address
==================

Devices (local devices) in the local network should get their IPv4 address via DHCP. But if
they cannot display this address and the DHCP server does not display it a user cannot
access the device without trying addresses.
A deterministic method to get the local device IP is needed.

This problem assumes that the device is installed in a typical IPv4 installation:

- the local network is connected to the internet
- between the internet and the local network NAT is used
- the local network has a DHCP server


Concept
=======

registration
------------

- the local device is installed in the local network
- on start it requests a DHCP address
- if this is successfull and a default gateway is provided:

    - connect to the portal JSON API
    - submit the following information

        - (indirectly) public internet IP address of the local network
        - local IP address
        - MAC address
        - device name (freely configurable on the device)
        - device type (product name)

- this is repeated every 15 minutes or whenever the local device address is changed
- the registration is stored on the portal server
- the registration data times out after 20 minutes

list
----

- a client connects to the portal (via JSON or human readable website) to request the available local devices and supplies the following information

    - (indirect) public internet IP address of the local network

- the server responds with all supplied information in the registration for this public ip address

    - for each registered  device for this ip address

        - local IP address
        - MAC address
        - device name
        - device type


JSON interface
==============

Registration
------------

.. code-block:: none

   URL: http://DOMAIN/api/register/
   Method POST
   Version 1.0

This enables you to register your device to the portal. The key that is looked up in the internal database is your public IP address.

Body arguments
~~~~~~~~~~~~~~


The POST request sends the following data:

- local IP address
- MAC Address
- Device Name
- Device Type

Body example
~~~~~~~~~~~~

.. code-block:: json

   {
       "macaddress":"00:01:87:FF:FF:FF",
       "internalipaddress":"192.168.37.100",
       "devicename":"livingroom",
       "devicetype":"XXXXXXX"
   }

Response
~~~~~~~~

On success:

.. code-block:: json

   {
       "result":"success",
       "publicipaddress": "$THEPUBLICIPADDRESS"
   }


On error:

.. code-block:: json

   {
      "result":"error",
      "description":"$ERRORDESCRIPTION"
   }


List
----

.. code-block:: none

   URL: http://DOMAIN/api/list/
   Method GET
   Version 1.0

This enables you to get a list of local IPs of all your local devices.

Returns a list of all bridges on the local network and their internal IP addresses.

If there are no local devices on the external IP where the list request comes from then the system will return an empty list, json string: [].

Response data
~~~~~~~~~~~~~

The response contains the following data:

- local IP address
- MAC Address
- Device Name
- Device Type

Response example
~~~~~~~~~~~~~~~~

If no device was found, or request failed due to server error:

.. code-block:: json

   []


If some device are found:

.. code-block:: json

   [
       {
           "macaddress":"00:01:87:FF:FF:FE",
           "internalipaddress":"192.168.37.100",
           "devicename":"livingroom",
           "devicetype":"XXXXXXX"
       },
       {
           "macaddress":"00:01:87:FF:FF:FF",
           "internalipaddress":"192.168.37.103",
           "devicename":"garage",
           "devicetype":"YYYYYYY"
       }
   ]


HTML interface
==============

The HTML interface can be used by humans to list their devices in the local network.

URL: http://DOMAIN/

The HTML data lists the following data for each local device on the same public IP as the requesting user:

- local IP address
- MAC Address
- Device Name
- Device Type
