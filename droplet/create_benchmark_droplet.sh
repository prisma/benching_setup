#!/bin/bash
set -e
ID=`doctl compute droplet create mbtest --tag-names connector:postgres,version:1_13-alpha,import:1000,test:all,api_token:$DIGITAL_OCEAN_ACCESS_TOKEN --no-header --format "ID" --wait --size 8gb --region fra1 --image 30970148 --ssh-keys 1b:7d:9e:eb:81:55:33:71:94:9d:37:f2:ea:c9:8a:99 --user-data-file cloud_config`
echo "ID is $ID"
IP=`doctl compute droplet get $ID --no-header --format="PublicIPv4"`
echo "IP is $IP"