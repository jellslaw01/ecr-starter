# Welcome to the ecr-deploy wiki!

## Build Docker Image 

docker build -t hypercall:v1 -f docker/production.dockerfile .

1. -t    :::> indicate tag name (ex. hypercall:v1)
2. -f    :::> provide path from which you wanna build the docker image
***

## Check List of Images in Docker 

docker image ls -a


## Run Docker image  as detached mode 

docker run -d hypercall:v1 ::>> It is not exposing the port that we have mentioned in the dockerfile for build

#### User this detached mode for running the docker image 

docker run -d -p 3000:3000 hypercall:v1

> port_of_server:port_which_exposed_from_docker
 

1. -d   :::> indicated the detach mode 
2. hypercall:v1   :::> image tag we have provided while building the docker image


## Check Docker container 

docker ps

## Docker Logs 

docker logs b872d3c9c181 --tail 100 -f

1. b872d3c9c181  ::> container id 


## Delete Any Container (If container is running you have to stop it first) 

1. docker stop container_id
2. docker rm container_id

## TEST DEPLOYED SERVER APIS

BASE_URL :  EC2_PUBLIC_IP:EXPOSED_PORT

Ex.  http://35.154.119.51:3000

***

BASE_API_URL : NODE_SERVER_API_URL

Ex. /api/getAll

***


API_URL : BASE_URL + BASE_API_URL 

Ex. http://35.154.119.51:3000/api/getAll


## DRONE.IO CD SETUP

1. Create AWS EC2 Instance to run drone.io ci in ec2 
2. Create an OAuth app in github
   
   <img width="1438" alt="Screenshot 2021-10-23 at 3 52 30 PM" src="https://user-images.githubusercontent.com/25931598/138552403-577a0cd1-3070-415f-93f1-4a6836ea6b92.png">
   
   ----------------------
   
   <img width="1438" alt="Screenshot 2021-10-23 at 3 51 58 PM" src="https://user-images.githubusercontent.com/25931598/138552424-3452c7a6-0bea-47a8-8628-0019e6107968.png">
   
   
  >>> Replace PUBLIC_IP of EC2 INSTANCE in Homepage URL and Authorization Callback URL
   
   
3. Setup DRONE.IO CI in EC2 Instance 

    VISIT [Drone.IO Documentation](https://docs.drone.io/server/provider/github/)  to setup drone ci in EC2 instance
    
    
       docker run   --volume=/var/lib/drone:/data   
       --env=DRONE_GITHUB_CLIENT_ID=GITHUB_CLIENT_ID 
       --env=DRONE_GITHUB_CLIENT_SECRET=GITHUB_CLIENT_SECRET   
       --env=DRONE_RPC_SECRET=GENERATED_RPC_SECRET   
       --env=DRONE_SERVER_HOST=EC2_INSTANCE_PUBLIC_IP   
       --env=DRONE_SERVER_PROTO=http   
       --publish=80:80   
       --publish=443:443   
       --restart=always   
       --detach=true   
       --name=drone   
       drone/drone:2
   
 

## Install Jenkins for CI 

### Install in mac

Download it from https://www.jenkins.io/download/lts/macos/ here.

then follow this blog to setup Jenkins in mac.

https://www.macminivault.com/installing-jenkins-on-macos/


Jenkins always run in 8080 port :  http://localhost:8080/ 
