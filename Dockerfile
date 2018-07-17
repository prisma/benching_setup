From ubuntu
ADD . /benching_setup/
RUN cd /benching_setup/setup_scripts/tools && ./setup.sh
WORKDIR /benching_setup/
ENTRYPOINT ["yarn", "run"]
