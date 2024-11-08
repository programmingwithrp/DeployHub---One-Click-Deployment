# Project Name

Brief description of your project.

## Table of Contents

- [Introduction](#introduction)
- [Services](#services)
  - [Upload Service](#upload-service)
  - [Deploy Service](#deploy-service)
  - [Request Handler](#request-handler)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)


## Use Command to RUN Reddis Queue -running linux on windows by using WSL 
    1  curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
    2  echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
    3  sudo apt-get update
    4  sudo apt-get install redis
    5  sudo apt-get update
    6  sudo apt-get install redis
    7  sudo service redis-server start
    8  redis-cli
## To check custom End point working or not in local i added custom url in localhost file in windows

Path - C:\Windows\System32\drivers\etc

Add Entry here

## Introduction

Provide a brief overview of your project, its purpose, and its main features.

## Services

### Upload Service

The Upload Service is responsible for fetching GitHub URLs from the UI (located in the frontend folder) and uploading them to an S3 bucket. Additionally, it adds the project ID to a Redis queue for further processing.

To start the Upload Service, run the following command:

npm start


### Deploy Service

The Deploy Service handles the deployment process triggered by elements in the Redis queue. It retrieves data from S3, saves it locally, builds it, and uploads the required built files back to S3 in the dist folder.

To start the Deploy Service, run the following command:

npm start


### Request Handler

The Request Handler service manages incoming requests and serves the required content based on custom URLs. It also monitors the status of deployments by fetching data from the queue.

## Setup

Provide instructions on how to set up and configure the project environment, including any dependencies.

## Usage

Explain how to use each service and any additional functionalities provided by your project.

## Contributing

Include guidelines for contributing to your project, such as how to report bugs, suggest improvements, or submit pull requests.

## License

Specify the license under which your project is released.

