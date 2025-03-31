# A simple Wordle clone

## How to run (Docker)

Download and run the docker image with the following command:

```
docker pull ghcr.io/darthmikke/ordleik:latest
docker run --rm -p 8080:80 ghcr.io/darthmikke/ordleik:latest
```

The images are built for amd64 and arm64 architectures.

## How to run locally

Clone the repo, then:

```
nvm install
nvm run dev
```

Tested with NPM v22.
