#!/bin/bash

docker rm -f serveur-html
bash -c "docker run -d --rm --name serveur-html -v $(pwd):/usr/share/nginx/html -p $1:80 nginx" 