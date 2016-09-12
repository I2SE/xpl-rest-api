#!/usr/bin/nodejs
/*
 * This JavaScript example shows how to build a JSON request to switch a
 * channel on an XPL Rail device on or off.
 * It can be used which NodeJS or within a browser environment. In a NodeJS
 * environment, install 'xhr2' library first, using:
 *  $ npm install xhr2
 * This library emulates the XMLHttpRequest object which is present in browser
 * environments by default.
 * For usage in browsers, you can comment out/remove also the code which is used
 * to pass the command line arguments to the functions.
 */

/* remove the following line when using this example within a browser environment */
var XMLHttpRequest = require('xhr2');

/**
 * A sample callback function which can be used with xpl_request.
 *
 * This callback is called when the request is finished or an error occurred.
 * @param {object} request - the XMLHttpRequest object of the request. which is called after the request finished:
 * @param {object} error - Null if the request was successfull, an Error object otherwise.
 */
function example_callback(request, error)
{
    if (error)
        console.log(error.toString());
}

/**
 * Helper function to send a request to a given XPL Rail.
 *
 * @param {String} method - passed to the XMLHttpRequest object, i.e. 'GET' or 'PUT'
 * @param {String} url - URL on the XPL Rail to access
 * @param {Object} data - a JavaScript object containing data to send, is
 *                        converted to JSON string and send within the HTTP request
 * @param {Function} callback - callback function to be called on success/error
 * @param {Number} timeout - timeout in milliseconds for the request to complete
 * @return {bool} False on error, true otherwise.
 */
function xpl_request(method, url, data, callback, timeout)
{
    var r, r_timeout;

    /* sanitize and check parameters */
    method = method.toUpperCase();
    if (method != "GET" && method != "PUT")
        return false;

    /*
     * Because of a caching bug in IE, we must generate a unique URL for each 
     * request, so we simply append a timestamp.
     */
    if (method == "GET")
    {
        /* look for existing url parameters and add required delimiter */
        if (url.search("?") >= 0)
            url += "&";
        else
            url += "?";

        url += "_ts=" + new Date().getTime();
    }

    /* create new request object */
    r = new XMLHttpRequest();

    /* register a callback in case request timeouts */
    r_timeout = setTimeout(function() {
        /* first abort the request */
        r.abort();

        /* then call user-defined callback with error information */
        callback(r, new Error("xpl_request: timeout occured"));
    }, timeout);

    /* register a callback to observer request progress */
    r.onreadystatechange = function() {
        if (r.readyState != 4)
            return;

        /* request finished, so cancel timeout */
        clearTimeout(r_timeout);

        /* check HTTP status code returned from server and call user-defined callback */
        if (r.status != 200)
            callback(r, new Error("xpl_request: server returned: " + r.status));
        else
            callback(r, null);
    }

    /* open url */
    r.open(method, url, true);

    /* if data is given convert to JSON string representation */
    if (data !== null)
    {
        r.setRequestHeader('Content-Type', 'application/json');
        data = JSON.stringify(data);
    }

    /* send out the request */
    r.send(data);
    return true;
}

/**
 * Helper function to switch a given channel (Digital Output) on a given XPL Rail.
 *
 * @param {String} host - hostname/ip address of the XPL Rail
 * @param {Number} channel - physical channel number to switch
 * @param {bool} on - True switches the channel on, False off.
 * @return {bool} False on error, true otherwise.
 */
function xpl_switch_channel(host, channel, on)
{
    var data = { 'value': on ? 1 : 0 };
    var url = "http://" + host + "/api/channel/physical/io/" + channel;

    return xpl_request("PUT", url, data, example_callback, 5000);
}

/* Remove the following lines when your run this example in a browser environment.
 * In a nodejs environment, it passes the command line arguments to our helper
 * functions.
 */
if (process.argv.length == 5)
{
    xpl_switch_channel(process.argv[2], process.argv[3], process.argv[4] == 'on');
}
else
{
    console.log("Usage: " + process.argv[2] + "<ip-address> <channel> on|off");
}
