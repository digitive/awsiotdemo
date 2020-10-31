# AWS IoT Demo

This project is a quick demo for using AWS IoT to collect CPU temperature from an edge device, and record it in DynamoDB every 10 seconds. There will be a RESTful API to query the data.

## The Edge Device

It can be any device that compatible with AWS IoT. In this example, I am using my home Plex Media Server (running Ubuntu Server) as the edge device.

## Collecting CPU Temperature Data

Collecting CPU temperature data is done via [Node-RED](https://nodered.org/). A node module [node-red-contrib-cpu](https://flows.nodered.org/node/node-red-contrib-cpu) is used to read CPU temperature from local sensors.

Collected data is published to AWS IoT via [MQTT](https://mqtt.org/)

