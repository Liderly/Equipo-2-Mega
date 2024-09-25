CREATE DATABASE MegaHackathon
GO

USE MegaHackathon
GO

--PARA CUADRILLAS
INSERT INTO Cuadrillas
VALUES
(1),(2),(3),(4),(5),(6),(7),(8),(9),(10);
GO
SELECT * FROM Cuadrillas



--PARA AGREGAR LOS T�CNICOS
DECLARE @Nombres TABLE (Nombre NVARCHAR(100))
DECLARE @ApellidosTable TABLE (Apellido NVARCHAR(200))
-- Insertar nombres, apellidos y especialidades comunes
INSERT INTO @Nombres VALUES 
('Juan'), ('Mar�a'), ('Carlos'), ('Ana'), ('Miguel'), 
('Isabel'), ('Pedro'), ('Laura'), ('Jos�'), ('Carmen')

INSERT INTO @ApellidosTable VALUES 
('Garc�a'), ('Rodr�guez'), ('Mart�nez'), ('L�pez'), ('Gonz�lez'), 
('P�rez'), ('S�nchez'), ('Ram�rez'), ('Torres'), ('Flores')

DECLARE @Contador INT = 1
DECLARE @TotalRegistros INT = 10

WHILE @Contador <= @TotalRegistros
BEGIN
    -- Seleccionar un nombre, apellido y especialidad aleatoria
    DECLARE @Nombre NVARCHAR(100), @Apellidos NVARCHAR(200)
    
    SELECT TOP 1 @Nombre = Nombre FROM @Nombres ORDER BY NEWID()
    SELECT TOP 1 @Apellidos = Apellido FROM @ApellidosTable ORDER BY NEWID()
    
    DECLARE @NoEmpleado INT = @Contador + 1000

    -- Insertar un nuevo registro en la tabla Tecnicos
    INSERT INTO Tecnicos (Nombre, Apellidos, NoEmpleado, IDCuadrilla)
    VALUES (
        @Nombre,
        @Apellidos,
		@NoEmpleado,
        CAST(RAND() * 10 + 1 AS INT)
		)-- Asumiendo que hay 10 cuadrillas
		
    SET @Contador = @Contador + 1
END
GO
-- Verificar los registros insertados
SELECT * FROM Tecnicos



--PARA LOS CLIENTES
-- Declarar tablas de variables para nombres y apellidos
DECLARE @Nombres TABLE (Nombre NVARCHAR(100))
DECLARE @ApellidosTable TABLE (Apellido NVARCHAR(200))

-- Insertar nombres y apellidos comunes
INSERT INTO @Nombres VALUES 
('Juan'), ('Mar�a'), ('Carlos'), ('Ana'), ('Miguel'), 
('Isabel'), ('Pedro'), ('Laura'), ('Jos�'), ('Carmen')

INSERT INTO @ApellidosTable VALUES 
('Garc�a'), ('Rodr�guez'), ('Mart�nez'), ('L�pez'), ('Gonz�lez'), 
('P�rez'), ('S�nchez'), ('Ram�rez'), ('Torres'), ('Flores')

DECLARE @Contador INT = 1
DECLARE @TotalRegistros INT = 10

WHILE @Contador <= @TotalRegistros
BEGIN
    -- Seleccionar un nombre y apellido aleatorio
    DECLARE @Nombre NVARCHAR(100), @Apellidos NVARCHAR(200)
    
    SELECT TOP 1 @Nombre = Nombre 
    FROM @Nombres ORDER BY NEWID()
    
    SELECT TOP 1 @Apellidos = Apellido 
    FROM @ApellidosTable ORDER BY NEWID()

    -- Generar NoSuscriptor con al menos 3 d�gitos
    DECLARE @NoSuscriptor INT = @Contador + 100

    -- Insertar un nuevo registro en la tabla Cliente
    INSERT INTO Cliente (NoSuscriptor, Nombre, Apellidos, Domicilio, Telefono)
    VALUES (
        @NoSuscriptor,
        @Nombre,
        @Apellidos,
        'Calle ' + @Apellidos + ' ' + CAST(@Contador AS NVARCHAR(2)),
        '6' + RIGHT('00000000' + CAST(CAST(RAND() * 99999999 AS INT) AS VARCHAR(8)), 8)
    )
    
    SET @Contador = @Contador + 1
END

GO
-- Verificar los registros insertados
SELECT * FROM Cliente



--PARA LOS PUNTAJES

INSERT INTO PUNTAJE
VALUES
(20),(25),(30);
GO



--PARA EL TRABAJO
INSERT INTO Trabajo
VALUES
('Instalaci�n de cometidas', 3),
('Instalaci�n de equipo', 2),
('Cambio de lugar',1),
('Instalaci�n de servicio',1);
GO

--PARA EL BONO
INSERT INTO Bono
VALUES
(0),(300),(500),(650);
GO
SELECT *FROM Bono



--PARA EL RANGO
INSERT INTO Rango
VALUES
(0,80,1),(81,150,2),(151,210,3), (210,NULL,4);
GO
SELECT *FROM Rango

--PARA EL SERVICIO
INSERT INTO Servicio 
VALUES 
('TV B�SICO'),
('TV CONECTA'),
('INTERNET RESIDENCIAL 1GB'),
('INTERNET RESIDENCIAL 500MB'),
('INTERNET RESIDENCIAL 200MB'),
('TELEFON�A FIJA ILIMITADA'),
('TELEFON�A M�VIL PAQUETE 300'),
('TELEFON�A M�VIL PAQUETE 200');
 SELECT *FROM Servicio


 --PARA EL ESTATUS
 INSERT INTO Estatus
 VALUES
 ('En proceso'),('Completada'),('Pendiente'),('Cancelada');
 GO
 SELECT *FROM Estatus


--PARA LA ORDEN DE TRABAJO
INSERT INTO OrdenTrabajo (IDEstatus, IDCuadrilla, IDCliente, IDTrabajo, IDServicio)
VALUES (2, 5, 3, 2, 6),
       (1, 1, 8, 3, 2),
       (3, 9, 2, 1, 5),
       (4, 2, 5, 4, 7),
       (1, 7, 6, 3, 8),
       (2, 4, 1, 2, 3),
       (3, 8, 10, 4, 1),
       (1, 6, 4, 1, 4),
       (4, 10, 9, 3, 6),
       (2, 3, 7, 2, 8),
       (1, 5, 2, 4, 7),
       (3, 9, 6, 1, 3),
       (4, 10, 4, 3, 5),
       (2, 1, 8, 2, 1),
       (3, 7, 10, 4, 6),
       (1, 6, 5, 3, 2),
       (4, 2, 9, 1, 4),
       (2, 3, 3, 2, 7),
       (3, 4, 1, 4, 8),
       (1, 8, 7, 3, 5);

 SELECT *FROM OrdenTrabajo









--para limpiar registros 

DELETE FROM OrdenTrabajo;
DELETE FROM Tecnicos;
DELETE FROM Cuadrillas;
DELETE FROM Trabajo;
DELETE FROM Servicio;
DELETE FROM Estatus;

-- Reiniciar los identity de las tablas
DBCC CHECKIDENT ('OrdenTrabajo', RESEED, 0);
DBCC CHECKIDENT ('Tecnicos', RESEED, 0);
DBCC CHECKIDENT ('Cuadrillas', RESEED, 0);
DBCC CHECKIDENT ('Trabajo', RESEED, 0);
DBCC CHECKIDENT ('Servicio', RESEED, 0);
DBCC CHECKIDENT ('Estatus', RESEED, 0);
