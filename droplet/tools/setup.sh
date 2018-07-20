apt-get update
apt-get install -y curl
apt-get install -y sudo
apt-get install -y gnupg
./install_vegeta.sh
./install_node.sh
./install_yarn.sh
yarn global add prisma
yarn install
./increase_file_descriptor_limit.sh