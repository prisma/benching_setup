#!/bin/bash
set -e
TOKEN="${1:?Provide the Digital Ocean API Token}"
echo "Deleting this Droplet!"
DROPLET_ID=`curl http://169.254.169.254/metadata/v1/id`
curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" "https://api.digitalocean.com/v2/droplets/$DROPLET_ID"
shutdown -h now