IMPORT_FILE="${1:?Please provide the import file to use. Valid values: 1000|10000}"
yarn prisma reset
yarn prisma import --data ../setup_scripts/import_data/${IMPORT_FILE}import.zip