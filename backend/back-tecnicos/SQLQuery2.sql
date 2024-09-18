
CREATE DATABASE test2a

USE test2a

CREATE TABLE Tecnicos (
   IDTecnico INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
   Nombre VARCHAR(250) NOT NULL,
   Apellidos VARCHAR(200) NOT NULL,
)


CREATE TABLE Cuadrillas (
    IDCuadrilla INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    IDTecnico INT
	FOREIGN KEY (IDTecnico) REFERENCES Tecnicos (IDTecnico),
);

CREATE TABLE Cliente (
    IDCliente INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Nombre VARCHAR(250) NOT NULL,
    Domicilio VARCHAR(250) NOT NULL,
    Telefono VARCHAR(250)
);

CREATE TABLE Trabajo (
    IDTrabajo INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Descripcion VARCHAR(MAX),
    Titulo VARCHAR(100),
    Puntaje FLOAT
);

-- Ahora crea la tabla OrdenTrabajo
CREATE TABLE OrdenTrabajo (
    IDOrden INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    FechaInicio DATE,
    FechaCierre DATE,
    Estatus VARCHAR(50),
    IDCuadrilla INT,
    IDCliente INT,
    IDTrabajo INT,
    FOREIGN KEY (IDCuadrilla) REFERENCES Cuadrillas (IDCuadrilla),
    FOREIGN KEY (IDCliente) REFERENCES Cliente (IDCliente),
    FOREIGN KEY (IDTrabajo) REFERENCES Trabajo (IDTrabajo)
);





