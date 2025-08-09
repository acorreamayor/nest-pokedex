<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
1. Clonar el repositorio
2. Ejecutar
```
yarn install
```
3. Tener instalado Nest CLI
```
npm i -g @nestjs/cliS
```

4. Levantar la base de datos
```
docker compose up -d
```

5. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```

6. Llenar las variables de entorno definidas en ```.env```

7. Ejecutar la aplicacion de dev:
```
yarn start:dev
```


8. Reconstruir la base de datos con la semilla (Solo en desarrollo)
```
http://localhost:3000/api/seed
``` 

## Stack usado
* MongoDB
* Nest


