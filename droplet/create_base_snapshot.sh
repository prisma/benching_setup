#!/bin/bash
set -e
ID=$1
if [ -z "${ID}" ]; then
    echo "No Droplet ID provided. Will create a new Droplet."
    ID=`doctl compute droplet create perf-test-base-snapshot --no-header --format "ID" --wait --size 1gb --region fra1 --image 30970148 --ssh-keys f9:60:c8:4e:27:83:ec:59:b9:bb:a6:20:9f:2e:2d:3b`
fi
echo "ID is $ID"
IP=`doctl compute droplet get $ID --no-header --format="PublicIPv4"`
echo "IP is $IP"
echo "Uploading the repo"
rsync -av --progress . root@$IP:benching_setup --exclude node_modules --exclude .git
echo "Installing the Tools"
ssh root@$IP 'cd setup_scripts/tools && ./setup.sh'
echo "Deleting old snapshot" # we are looping because there might be none and we do not want to error in this case
for IMAGE_ID in $(doctl compute image list | grep perf-testing | awk '{print $1}')
do
doctl compute image delete --force $IMAGE_ID
done
echo "Creating snapshot out of this droplet"
doctl compute droplet-action snapshot $ID --wait --snapshot-name perf-testing
echo "Deleting Droplet"
doctl compute droplet delete --force $ID