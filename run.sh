#build dockerfile
docker build  . -t mynotify:latest

docker run -ti -d --restart=always --name mysocketio -p 3000:3000 mynotify
#docker run -ti -d --restart=always --name mysocketio -v /path/to/your/main/script/app.js:/srv/app.js -p 8080:8080 voduytuan/docker-socketio
