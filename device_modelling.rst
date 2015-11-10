Device modelling
================

Before describing the API itself, it necessary to agree on a common wording and
to understand some basic concepts which are implemented within the XPL
device family. The following chapters describe these concepts and introduce
some terms used within this document and on the web front-end of each device.

Physical channel
----------------

A physical channel is the base of the whole device, i.e. it is the representation
of the screw terminals which form a usable unit. In other words, a *XPL Rail IO6*
device has 6 physical channels. The numbering of this channels is fixed and represents
the physical numbering. It is identical to the device printing/labels etc.

There exists two classes of physical channels: *serial* and *io*. As expected,
the class *serial* is used for COM port like channels, e.g. RS-232 or CAN interfaces,
whereas an *io* physical channel represents two/three screw terminals to connect
a sensor and/or a relais and so on.
These two classes are independently numbered from each other, because the devices
printing/labeling will also start anew while enumerating this interfaces.

A physical channel can have multiple capabilities, e.g. an io channel can
be configured as input or output, but there might be devices, which can not
be switch-able and thus are limited to output only. Also, a serial physical
channel is usually bound to its hardware driver (e.g. CAN vs. RS-485...).

Virtual channel
---------------

A virtual channel is a logical unit which is created in software. It requires at
least one physical channel as input source, and can have multiple physical outputs.
The main identification property is a unique virtual channel id, which is a simple
positive integer number between 1 and 65535. By design, the virtual channel id zero
is invalid.

Three different types of virtual channels exist:

  - digital virtual channels
  - analog virtual channels
  - serial virtual channels

This three type exist independently from each other, that means a digital virtual
channel with id 1 can exist in parallel to an analog virtual channel with id 1.
Both channel does not interfere in this case and cannot be mixed.

A virtual channel can only have one value at the moment, therefore it must be
given that only one input is active on each virtual channel for sane behaviour.
This concept is only disregarded in case of serial virtual channels: since these
channels does not really have a single value at any time, but are intended to
transfer data streams, multiple physical channels can be combined into one serial
virtual channel. In this case, the virtual channels act like a bus system: the
input of each physical channel is transferred to all other physical channels attached.
Note, that there is no attempt to ensure time or other synchronisations: as soon
as one device recognises input data, it is sent out to the other devices. So
it is also not possible to detect collisions as on a real physical UART interface.
Upper layers must be prepared to handle both situations smoothly.

Another important point is, that this concept makes it very easy to build
physical bus system converters, e.g. you could feed CAN data into a serial virtual
channel and output it via a RS-485 physical channel. Please keep in mind, that
no logical protocol conversation is made, so this example might make only
limited sense, but demonstrates the capabilities best.

Put it all together
-------------------

As stated above, only physical channels are always available on a device. The existence
of virtual channels depends on the configuration of physical channels.

You can assign a virtual channel to a physical channel, and thus create this virtual
channel. Then then physical channel acts as a value source for this channel or is driven
by the virtual channel's value.

Virtual channel data is exchanged via HTTP over UDP multicast packets.
When assigning virtual channel to a physical one, then you enable the generation
and receiving of such multicast packets for this virtual (and thus physical) channel.

However, you are not required to assign a virtual channel to a physical one. In this
case, the physical channel can not be controlled via multicast packets, nor generate
multicast packet itself upon e.g. state changes.

Please also note, that the state of a virtual channel can only be queried from the
device sourcing the virtual channel. This is important in the case, where packages
were lost during network transmission, so it's not possible to query a stale
virtual channel state, but only get the real, actual value from the source of
information. However, you can always read back the state of an assigned physical
channel.
