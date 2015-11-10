Error handling
==============

When the client request is faulty or an internal error occured, then an error
JSON response is generated and transmitted as result of the operation.

Usually, errors can only occur on PUT/POST requests. For GET requests, only
HTTP errors "404 - Not found" are generated, because wrong request parameters
etc. are silently ignored.

The structure of such a JSON error object returned is as follows:

.. code-block:: json

  {
    "version": "1.0",
    "result": 5
  }

The following table lists the result codes and there meaning.

+-------------+-----------------------------------------------------------------------+
| Result code | Description                                                           |
+=============+=======================================================================+
| 0           | No error occurred (this is normally not seen, as in this case         |
|             | real data is returned).                                               |
+-------------+-----------------------------------------------------------------------+
| 1           | JSON parsing error.                                                   |
+-------------+-----------------------------------------------------------------------+
| 2           | JSON request too long/internal out of memory condition.               |
+-------------+-----------------------------------------------------------------------+
| 3           | (reserved)                                                            |
+-------------+-----------------------------------------------------------------------+
| 4           | URL not recognized and/or invalid JSON data during POST/PUT request.  |
+-------------+-----------------------------------------------------------------------+
| 5           | Requested action is temporary not available (internal flash is busy), |
|             | re-issue the request after a few seconds.                             |
+-------------+-----------------------------------------------------------------------+
