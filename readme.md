# Docker Demo

# Hit following command to run both apps on docker

```
docker compose up -d
# -d or --detach # to run in background
```

## Docker volume example

- check the `docker-compose.yml` file to see the volumne configuration
- by running the project and testing file upload you will see that files are uploaded to `/var/new-demo-docker/uploads` as it's specified in docker compose file.

## Docker network

- check docker compose file and see if we use different network for service call it won't work.