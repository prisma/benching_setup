IMPORT_FILE="${1:?Please provide the import file to use. Valid values: 1000|10000}"
prisma reset -f
prisma import --data ./import_data/${IMPORT_FILE}import.zip