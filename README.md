# Planning algorithms of process

# Instalacion 
  Primero que todo clone o descargue el repositorio con el codigo fuente:
 
## Instalacion nodejs para linux
  Eliga su distribucion y siga los pasos aqui [nodejs](https://nodejs.org/es/download/package-manager/)
  
## Instalacion de nodejs para window
  Eliga la opcion de Windows Installer de 32bits o 64bits dependiando de su maquina [nodejs](https://nodejs.org/es/download/) 

Luego posicionese dentro del projecto 

```sh
  cd /planning-algorithms
```

Instalar dependencias (el comando npm viene con nodejs)
```sh  
  npm install
```
Luego Instalar dependencias globales

```sh
  npm install webpack -g
```

# Uso
Compilacion
```sh
  npm run webpack:build
```
Correr el proyecto
```sh
  npm run lift
```
Luego has click [aqui](http://localhost:3000/) , veras la interface de usuario del programa, dicha interface esta diseañada para resolver: FCFS, SJF, Priority, Round Robin. 

![Interface](/assets/interface.gif)



# Prueba funcional
Instala [selenium](https://www.npmjs.com/package/selenium-webdriver)
```sh
  npm install selenium-webdriver
```
Corre el test:
```sh
  npm run test
```
Esto deberia comenzar a probar toda la aplicacion, abriendo el navegador y ejecutando todas las acciones. 


