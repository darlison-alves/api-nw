# API NW

## Rodar projeto

Estou usando mongo como banco de dados pode usar a image publica:
```sh
$ sudo docker pull mongo
$ sudo docker run -p 27017:27017 -d -it mongo
```

Instalar dependências do projeto com npm
```sh
$ npm install
```

usei typescript no desenvolvimento, o comando abaixo faz a compilação
```sh
$ npm rum compile
```

Iniciar api, rodando na porta 8003
```sh
$ npm start
```