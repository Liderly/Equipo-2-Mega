

# HACKATHON-MEGA 

## Objetivo

 Elaborar un informe detallado para el procesamiento de pagos de puntos acumulados por los técnicos instaladores. Este reporte debe incluir un desglose de las actividades realizadas, los puntos obtenidos por cada 
 tarea completada y cualquier otra información relevante que facilite la revisión y aprobación de los pagos correspondientes

## Requerimientos Tecnicos 
   ## - Base de datos 
       SQL SERVER 
   ## -  Backend
       C# .Net
  ## - Frontend
     -  Angular  --Version:18


## Base de datos
## Características Principales
Estructura de Tablas: Contiene tablas para  [Tecnicos, Cuadrillas, Clientes, Trabajo , Orden trabajo, Estatus, Rango, Bono, Puntajes etc ], cada una con relaciones definidas para mantener la integridad referencial.
Procedimientos Almacenados: Incluye procedimientos almacenados que permiten realizar operaciones comunes de manera eficiente, como - [Trabajos que se realizan por cuadrillas y  calculo del bono obtenido por cuadrilla y tecnico].
Índices y Claves: Implementación de índices y claves primarias/foráneas para optimizar el rendimiento de las consultas y asegurar la integridad de los datos.

## Creacion de la base de datos y tablas 
![image](https://github.com/user-attachments/assets/ffa230aa-cae2-4fca-bfe3-8bd11b6425f2)
![image](https://github.com/user-attachments/assets/8c2dca3b-221c-4164-ace1-1adc88f7712c)
![image](https://github.com/user-attachments/assets/5006f723-0fd6-4bda-80ed-4400da769a74)



## Diagrama entidad relacion 
   ![DiagramaE-R](https://github.com/user-attachments/assets/fecf3984-ace9-4941-975b-abe4c1f8b77c)

## Reporte general 
![image](https://github.com/user-attachments/assets/23fd90ec-c893-4e77-a596-157e6d659ea9)

## insercion de  Tecnicos de forma automatizada 
![image](https://github.com/user-attachments/assets/bc7765c4-6e81-45dc-bb77-8303b7cefbe5)


## Backend
Este proyecto incluye un backend escalable desarrollado en C# utilizando el framework .NET. Está diseñado para ofrecer una API RESTful que permite la interacción  con los tecnicos instaladores , para que puedan observar las ordenes de trabajo que tiene que realizar asi como los domicilios donde se deben que llevar acabo, asi como interaccion con la persona encargada de otorgar el bono obervando el puntaje de las cuadrillas y tecnicos. realizacion del calculo automotico del bono correspondiente a cada tecnico.

Características Principales
Arquitectura MVC: Implementación del patrón Modelo-Vista-Controlador (MVC) para una clara separación de preocupaciones, facilitando la mantenibilidad y escalabilidad del código.
API RESTful: Proporciona endpoints bien definidos para operaciones CRUD (solo lectura ) sobre los recursos, permitiendo una fácil integración con aplicaciones front-end.
Acceso a Datos: Utiliza Entity Framework Core para la interacción con la base de datos, permitiendo un manejo eficiente de las entidades y las relaciones.

## Frontend
Este proyecto incluye un frontend desarrollado en Angular 18, que presenta tres interfaces gráficas.

Login: La primera interfaz permite a los usuarios iniciar sesión como técnico instalador o administrador.

Interfaz del Técnico Instalador: En esta sección, el técnico puede visualizar sus órdenes de trabajo pendientes, así como un resumen de cuántas tareas ha completado y cuántas están en proceso. Además, se muestran los datos del cliente, siendo la dirección uno de los elementos más importantes, ya que permitirá al instalador o a su equipo dirigirse al lugar donde se llevará a cabo el trabajo.

Interfaz del Administrador: Esta interfaz está diseñada para que el administrador realice un seguimiento del desempeño de cada cuadrilla y técnico. Podrá observar la cantidad de puntos acumulados por cada instalador de manera individual y determinar el monto correspondiente a los bonos que recibirá cada técnico.

## login
![image](https://github.com/user-attachments/assets/72c1515d-c32d-4d2c-a38b-1342fe13272c)

## Interfaz Tecnico 
![image](https://github.com/user-attachments/assets/027f7d72-8fe2-40f5-b366-c14a828af7f5)
![image](https://github.com/user-attachments/assets/4e86e5d7-d213-405f-a178-982e06fe38d7)








  












## Estructura del Repositorio

```plaintext
hackathon-proyecto/
│
├── frontend/                     # Código fuente del frontend (Angular)
│   ├── src/                      # Componentes, servicios, y módulos de Angular
│   ├── README.md                 # Instrucciones específicas del frontend
│
├── backend/                      # Código fuente del backend (API .NET)
│   ├── src/                      # Controladores, modelos y servicios de la API
│   ├── README.md                 # Instrucciones específicas del backend
│
├── docs/                         # Documentación adicional del proyecto
│   ├── frontend-docs/            # Documentación específica del frontend
│   ├── backend-docs/             # Documentación específica del backend
│   └── architecture.md           # Descripción de la arquitectura del proyecto
│
├── docker-compose.yml            # Configuración para contenedores en local (opcional)
├── .gitignore                    # Archivos y carpetas a ignorar por Git
├── README.md                     # Documentación general del proyecto (este archivo)
```

**Este es un template que te puede servir como base, pero recuerda ser creativx en la forma en la que estructuras este repositorio**

Para más información respecto al evento puedes consultar el siguiente [Notion](https://puzzle-basement-211.notion.site/Hackathon-Semillero-de-talento-Mega-a2a776b0c9394b579341b28033e4f18b)
