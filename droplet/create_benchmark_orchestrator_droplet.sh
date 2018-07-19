#!/bin/bash
set -e
ID=`doctl compute droplet create perf-test-orchestrator --no-header --format "ID" --wait --size 1gb --region fra1 --image 30970148 --ssh-keys 1b:7d:9e:eb:81:55:33:71:94:9d:37:f2:ea:c9:8a:99`
echo "ID is $ID"
IP=`doctl compute droplet get $ID --no-header --format="PublicIPv4"`
echo "IP is $IP"
until ssh -i $HOME/.ssh/prisma_digital_ocean root@$IP exit
do
  echo "The Droplet does not accept SSH connections yet. Will try again in 1 second."
  sleep 1;
done
# echo "Uploading the Doctl Dockerfile"
# scp -i $HOME/.ssh/prisma_digital_ocean doctl_dockerfile root@$IP:.
# echo "Uploading the Prisma setup files"
# scp -r -i $HOME/.ssh/prisma_digital_ocean ../setup_scripts/prisma-server root@$IP:.
# mkdir setup_scripts
# mv prisma-server ./setup_scripts/ # this is the location the benchmark script expects
echo "Uploading the SSH Key"
scp -i $HOME/.ssh/prisma_digital_ocean $HOME/.ssh/prisma_digital_ocean root@$IP:./.ssh/
echo "Uploading the setup scripts"
rsync -av -e "ssh -i $HOME/.ssh/prisma_digital_ocean" --progress ../ root@$IP:./benching_setup --exclude import_data --exclude node_modules --exclude .git

echo "Installing the doctl CLI"
ssh -i $HOME/.ssh/prisma_digital_ocean root@$IP << EOF
  curl -sL https://github.com/digitalocean/doctl/releases/download/v1.8.0/doctl-1.8.0-linux-amd64.tar.gz | tar -xzv
  sudo mv doctl /usr/local/bin/
  echo 'Host *' >> .ssh/config
  echo '  StrictHostKeyChecking no' >> .ssh/config
  # the export has to be on the top of the bashrc so that it is also present in non interactive ssh shells
  mv .bashrc .bashrc.tmp
  echo 'export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin' >> .bashrc
  echo 'export DIGITALOCEAN_ACCESS_TOKEN="246e56f225e5f9972aea8a5eebef99b78b1bd8ccba38483d87e8825fd7c66b3a"' >> .bashrc
  cat .bashrc.tmp >> .bashrc
  rm .bashrc.tmp
  # creating the crontab entries
  crontab -l 2>/dev/null; # suppress error message that crontab does not exist yet
  (crontab -l; echo "SHELL=/bin/bash") | crontab -
  (crontab -l; echo "* * * * * echo last run \$(date) > cronhealth.log") | crontab -
  (crontab -l; echo "02 10 * * * cd /root/benching_setup/droplet && ./benchmark_on_droplet.sh postgres 1.13-alpha 1000 >> /root/bench_postgres.log") | crontab -
  (crontab -l; echo "02 10 * * * cd /root/benching_setup/droplet && ./benchmark_on_droplet.sh mysql 1.13-alpha 1000 >> /root/bench_mysql.log") | crontab -
EOF
echo "IP is $IP"