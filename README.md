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

# Compilacion en produccion

1. Crear el archivo ```.end.prod```
2. llenatr las variables de entorno para produccion
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yml --env-file .env.prod up --build
```

# Notas
## Heroku redeploy sin cambios:
```
git commit --allow-empty -m "Tigger Heroku deploy"
git push heroku <master|main>
```
