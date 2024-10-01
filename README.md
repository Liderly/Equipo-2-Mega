<h1 align="center" style="color: #0366d6;">🚀 HACKATHON-MEGA 🚀</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Base%20de%20Datos-SQL%20Server-blue?style=for-the-badge&logo=microsoft-sql-server" alt="SQL Server">
  <img src="https://img.shields.io/badge/Backend-C%23%20.NET-blue?style=for-the-badge&logo=.net" alt="C# .NET">
  <img src="https://img.shields.io/badge/Frontend-Angular%2018-red?style=for-the-badge&logo=angular" alt="Angular 18">
</p>

## 🎯 <span style="color: #0366d6;">Objetivo</span>

Elaborar un informe detallado para el procesamiento de pagos de puntos acumulados por los técnicos instaladores. Este reporte incluye:
- Desglose de actividades realizadas
- Puntos obtenidos por cada tarea completada
- Información relevante para facilitar la revisión y aprobación de pagos

## 💻 <span style="color: #0366d6;">Requerimientos Técnicos</span>

### <span style="color: #0366d6;">Base de datos</span>
- SQL Server

### <span style="color: #0366d6;">Backend</span>
- C# .NET

### <span style="color: #0366d6;">Frontend</span>
- Angular (Versión: 18)

---

## 🗄️ <span style="color: #0366d6;">Base de datos</span>

### <span style="color: #0366d6;">Características Principales</span>
1. **Normalización de la Base de Datos**
2. **Estructura de Tablas:** 
   - Tecnicos, Cuadrillas, Clientes, Trabajo, Orden trabajo, Servicios,Estatus, Rango, Bono y Puntajes.
   - Relaciones definidas para mantener la integridad referencial.

3. **Procedimientos Almacenados:** 
   - Operaciones comunes como trabajos por cuadrillas y cálculo de bonos.

4. **Índices y Claves:** 
   - Optimización del rendimiento de consultas.
   - Aseguramiento de la integridad de datos.

### <span style="color: #0366d6;">Creación de la base de datos y tablas</span>

![Creación de BD y Tablas](https://github.com/user-attachments/assets/19860960-bdcd-4f04-aac4-c5b70ceec7d5)

### <span style="color: #0366d6;">Diagrama Entidad-Relación</span>

![Diagrama E-R](https://github.com/user-attachments/assets/fecf3984-ace9-4941-975b-abe4c1f8b77c)

### <span style="color: #0366d6;">Creación de SP</span>

![image](https://github.com/user-attachments/assets/108bd3b7-efc0-464d-8514-d22e7745d6e7)


### <span style="color: #0366d6;">Reporte General</span>

![image](https://github.com/user-attachments/assets/ff76c047-895a-43ed-8af2-79709af80e59)




---

## 🖥️ <span style="color: #0366d6;">Backend</span>

Proyecto escalable en C# utilizando el framework .NET, diseñado para ofrecer una API RESTful.

### <span style="color: #0366d6;">Características Principales</span>

- **Arquitectura MVC:** Separación clara de preocupaciones.
- **API RESTful:** Endpoints bien definidos para operaciones CRUD.
- **Acceso a Datos:** Utiliza Entity Framework Core.
- **Documentación de API:** Integración con Swagger.
 
### <span style="color: #0366d6;">Creación de Model y Controller</span>
![image](https://github.com/user-attachments/assets/b53fb5a6-694b-4be3-9cdf-a3b5a58e5dd7)


### <span style="color: #0366d6;">Pruebas en Swagger</span>
![Swagger API Documentation](https://github.com/user-attachments/assets/5a115023-0948-4138-bac2-1e56aa16ee1f)


### <span style="color: #0366d6;">Respuesta del funcionamiento de un EndPoint en formato json</span>
![image](https://github.com/user-attachments/assets/c6356224-a09b-4c03-91f9-a5597a490bbd)

---

## 🎨 <span style="color: #0366d6;">Frontend</span>

Desarrollado en Angular 18, el frontend ofrece una interfaz de usuario intuitiva y responsiva, diseñada para técnicos y administradores.
<span style="color: #0366d6;">Características Principales</span>

- Autenticación Segura
- Dashboard Personalizado para Técnicos
- Dashboard Analítico para Administradores
- Integración con API Swagger
- Diseño Responsivo

### <span style="color: #0366d6;">Características Principales</span>

1. Login Component

- Autenticación de usuarios 

2. Dashboard Técnico Component
- Datos principales del técnico
- Lista de órdenes de trabajo incluyendo datos del Cliente
- Visualización de bono semanal y puntos acumulados
  
3. Dashboard Administrador Component
- Datos de Tecnicos por cuadrilla
- Gráfico de progreso semanal
- Puntos y Bonos por cuadrilla

### <span style="color: #0366d6;">Interfaces</span>

1. **Login**
   ![Login Interface](https://github.com/user-attachments/assets/4b88576d-616b-4b7a-a5ac-df6f0b87cd4f)

2. **Dashboard Técnico**
   ![Técnico Dashboard 1](https://github.com/user-attachments/assets/8fc433cd-50b4-4e3b-b7e6-b20f8c6cf87c)
   
3. **Órdenes de Trabajo con Estatus de color**
   ![Técnico Dashboard 2](https://github.com/user-attachments/assets/1795345f-7350-4311-9375-14409c1ec9eb)
4. **Órdenes desplegables con detalles y Google Maps**
 ![Técnico Dashboard 3](https://github.com/user-attachments/assets/5f87cde2-b521-4cec-97f6-ced60b6e6228)

6. **Dashboard Administrador**
   ![Admin Dashboard](https://github.com/user-attachments/assets/e34650cd-5025-4288-a7f3-64ff27721904)

---

## 👨‍💻 👨‍💻  <span style="color: #0366d6;">INTEGRANTES DEL EQUIPO</span> 👨‍💻 👨‍💻

| [<img src="https://github.com/user-attachments/assets/39a7acad-f3d8-4e1e-9815-963e2188dcd0" width=115><br><sub>Armando Pineda Gama</sub>](https://github.com/odnxmrx) | [<img src="https://github.com/user-attachments/assets/1d16b82e-dd17-4c9f-931b-0ffb6e0798cc" width=115><br><sub>Emmanuel Salcedo Davalos</sub>](https://github.com/EmmanuelDev97) | [<img src="https://github.com/user-attachments/assets/2e3de00f-2ebf-4241-b834-424683f4b7dc" width=115><br><sub>K. Julieta Jiménez García</sub>](https://github.com/Julieta171) | [<img src="https://github.com/user-attachments/assets/baebde77-09ca-4008-b122-20f6c9b847cb" width=115><br><sub>Javier Montaño Rodriguez</sub>](https://github.com/javixlive) |
| :---: | :---: | :---: | :---: |

<p align="right">(<a href="#readme-top">Volver al inicio</a>)</p>









