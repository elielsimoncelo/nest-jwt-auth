FROM node:16-alpine3.14

# diretório alvo
RUN mkdir -p /usr/app
WORKDIR /usr/app

# instalação de dependências
RUN apk add --no-cache bash
RUN apk update && apk upgrade
RUN apk add --no-cache python3 g++ make
RUN npm install -g @nestjs/cli

# copiar o projeto e instalar os pacotes com o npm
COPY . /usr/app
RUN npm install

# fazer o build da aplicação
RUN npm run build

# abrindo a porta 3000
EXPOSE 3000

# inicializando a API
CMD [ "npm","run", "start:dev" ]