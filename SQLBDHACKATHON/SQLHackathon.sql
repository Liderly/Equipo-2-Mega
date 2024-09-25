CREATE DATABASE MegaHackathon
GO

USE MegaHackathon
GO

CREATE TABLE Cuadrillas (
    IDCuadrilla INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	NoCuadrilla INT NOT NULL,
);
GO

CREATE TABLE Tecnicos (
   IDTecnico INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
   Nombre NVARCHAR(250) NOT NULL,
   Apellidos NVARCHAR(200) NOT NULL,
   NoEmpleado INT NOT NULL,
   IDCuadrilla INT,
   FOREIGN KEY (IDCuadrilla) REFERENCES Cuadrillas (IDCuadrilla),
);
GO



CREATE TABLE Cliente (
    IDCliente INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	NoSuscriptor INT NOT NULL,
    Nombre NVARCHAR(100) NOT NULL,
	Apellidos NVARCHAR(100) NOT NULL,
    Domicilio NVARCHAR(250) NOT NULL,
    Telefono NVARCHAR(250)
);
GO

CREATE TABLE PUNTAJE(
	IDPuntaje INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Puntos INT NOT NULL,
	);
GO


CREATE TABLE Trabajo (
    IDTrabajo INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Descripcion NVARCHAR(MAX),
	IDPuntaje INT,
	FOREIGN KEY (IDPuntaje) REFERENCES PUNTAJE (IDPuntaje),
);
GO

CREATE TABLE Servicio(
	IDServicio INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Titulo NVARCHAR(MAX),
);
GO

CREATE TABLE Estatus(
IDEstatus INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
EstatusTrabajo NVARCHAR(50)
)
GO
SELECT *FROM Estatus

CREATE TABLE Bono(
IDBono INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
Pago INT NOT NULL,
)
GO

CREATE TABLE Rango(
 RangoIn INT NOT NULL,
 RangoFin INT,
 IDBono INT,
 FOREIGN KEY (IDBono) REFERENCES Bono (IDBono),
)
GO
-- Ahora crea la tabla OrdenTrabajo
CREATE TABLE OrdenTrabajo (
    IDOrden INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    FechaInicio DATETIME DEFAULT GETDATE(),
    IDEstatus INT,
    IDCuadrilla INT,
    IDCliente INT,
    IDTrabajo INT,
	IDServicio INT,
    FOREIGN KEY (IDCuadrilla) REFERENCES Cuadrillas (IDCuadrilla),
    FOREIGN KEY (IDCliente) REFERENCES Cliente (IDCliente),
    FOREIGN KEY (IDTrabajo) REFERENCES Trabajo (IDTrabajo),
	FOREIGN KEY (IDServicio) REFERENCES Servicio (IDServicio),
	FOREIGN KEY (IDEstatus) REFERENCES Estatus (IDEstatus),
);
GO