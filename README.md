# Planning algorithms of process

# Instalacion 
  Primero que todo clone o descargue el repositorio con el codigo fuente:
 
## Instalacion para linux
  Eliga su distribucion y siga los pasos aqui [nodejs](https://nodejs.org/es/download/package-manager/)
  
## Instalacion para window
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
  npm install webpack lite-server -g
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
Esto abrira el navegador con la interface de usuario del programa, dicha interface esta diseañada para resolver: FCFS, SJF, Priority, Round Robin. 

![Interface](/assets/interface.gif)





