#!/usr/bin/env python
#
# Usage: xpl-on-off.py <ip> <channel> [on|off]
#
# Example: $ xpl-on-off.py 192.168.178.191 1 on
#
from __future__ import print_function
import sys
import json
import requests

if len(sys.argv) < 3:
    print("Usage: %s [-v] <ip> <channel> [on|off]" % (sys.argv[0]), file = sys.stderr)
    sys.exit(2)

params = sys.argv[1:]

verbose = False
if params[0] == '-v':
    params.pop(0)
    verbose = True

host = params.pop(0)
path = "/api/channel/physical/io/%d" % (int(params.pop(0)))

on_off = params.pop(0).lower() == "on"
payload = { 'value': int(on_off) }

url = "http://" + host + path
headers = { 'Content-Type' : 'application/json' }
data = json.dumps(payload)

if verbose:
    print("URL: " + url, file = sys.stderr)
    print("JSON: " + data, file = sys.stderr)

r = requests.put(url, data = data, headers = headers)
try:
    r.raise_for_status()
except requests.exceptions.HTTPError:
    if verbose:
        print("ERROR", file = sys.stderr)
    sys.exit(1)

response = r.json()
if 'result' in response:
    if verbose:
        print("ERROR: %d" % (response['result']), file = sys.stderr)
    sys.exit(1)

if verbose:
    print("OK", file = sys.stderr)

sys.exit(0)
