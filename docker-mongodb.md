docker run -d \
    -p 27017:27017 \
          --name mongo \
    -v mongo_data:/data/db \
    -e MONGO_INITDB_ROOT_jmcvalles=root \
	  -e MONGO_INITDB_ROOT_password1234=root \
    mongo:latest