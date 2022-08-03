FROM node:12

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start"]


# 之后在命令行通过如下命令构建镜像：
# docker build . -t <your username>/node-web-app

# 如下命令运行镜像
# docker run -p 49160:8080 -d <your username>/node-web-app



