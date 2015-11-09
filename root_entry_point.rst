Root entry point
================

The root entry point for the API within the devices' URL space, is
``http://<device>/api``.

The root entry point is used to obtain information about the API itself. 
At the moment it is only possible to query the API version number. You have to
issue a GET request to the root entry point to get this information:

  $ curl http://<device>/api

You will receive a JSON response as follows:

.. code-block:: json

  {
    "version": "1.0"
  }
