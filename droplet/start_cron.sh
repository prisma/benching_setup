curl http://169.254.169.254/metadata/v1/tags/ > metadata
function getValue {
    KEY=$1
    LINE=`cat metadata | grep $KEY`
    echo ${LINE#$KEY:}
}
export DIGITAL_OCEAN_ACCESS_TOKEN=`getValue api_token`
yarn start-cron