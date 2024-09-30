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


-- Crear tablas temporales para nombres y apellidos
DECLARE @Nombres TABLE (Nombre NVARCHAR(100))
DECLARE @ApellidosTable TABLE (Apellido NVARCHAR(200))

-- Insertar nuevos nombres
INSERT INTO @Nombres VALUES 
('Pablo'), ('Sof�a'), ('Diego'), ('Valentina'), ('Andr�s'), 
('Daniela'), ('Luis'), ('Fernanda'), ('Mateo'), ('Camila')

-- Insertar nuevos apellidos
INSERT INTO @ApellidosTable VALUES 
('Fern�ndez'), ('Castillo'), ('Herrera'), ('Morales'), ('Delgado'), 
('Castro'), ('Pe�a'), ('Romero'), ('Ortiz'), ('Navarro')

-- Obtener el n�mero total de registros actuales en la tabla Tecnicos
DECLARE @TotalExistentes INT
SELECT @TotalExistentes = COUNT(*) FROM Tecnicos

-- Configurar el contador para que inicie despu�s del �ltimo t�cnico existente
DECLARE @Contador INT = @TotalExistentes + 1  -- El siguiente n�mero de empleado
DECLARE @TotalRegistros INT = 10  -- N�mero de t�cnicos que deseas agregar

-- Bucle para insertar nuevos t�cnicos
WHILE @Contador <= (@TotalExistentes + @TotalRegistros)
BEGIN
    -- Declarar variables dentro del ciclo para que est�n disponibles
    DECLARE @Nombre NVARCHAR(100), @Apellidos NVARCHAR(200)

    -- Seleccionar un nombre y apellido aleatorio
    SELECT TOP 1 @Nombre = Nombre FROM @Nombres ORDER BY NEWID()
    SELECT TOP 1 @Apellidos = Apellido FROM @ApellidosTable ORDER BY NEWID()
    
    -- Definir el n�mero de empleado, asegurando que sea �nico
    DECLARE @NoEmpleado INT = @Contador + 1000  -- Asumimos que quieres continuar con la numeraci�n a partir de 1001

    -- Insertar un nuevo registro en la tabla Tecnicos
    INSERT INTO Tecnicos (Nombre, Apellidos, NoEmpleado, IDCuadrilla)
    VALUES (
        @Nombre,
        @Apellidos,
		@NoEmpleado,
        CAST(RAND() * 10 + 1 AS INT)  -- Asignar a una cuadrilla aleatoria entre 1 y 10
		)
		
    -- Incrementar el contador
    SET @Contador = @Contador + 1
END
GO

-- Verificar los registros insertados
SELECT * FROM Tecnicos;


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
INSERT INTO OrdenTrabajo (NumeroOrden, IDEstatus, IDCuadrilla, IDCliente, IDTrabajo, IDServicio)
VALUES (333,2, 5, 3, 2, 6),
       (874,1, 1, 8, 3, 2),
       (6598,3, 9, 2, 1, 5),
       (3664,4, 2, 5, 4, 7),
       (6666,1, 7, 6, 3, 8),
       (6985,2, 4, 1, 2, 3),
       (3698,3, 8, 10, 4, 1),
       (1478,1, 6, 4, 1, 4),
       (2581,4, 10, 9, 3, 6),
       (2589,2, 3, 7, 2, 8),
       (6547,1, 5, 2, 4, 7),
       (3214,3, 9, 6, 1, 3),
       (1245,4, 10, 4, 3, 5),
       (9827,2, 1, 8, 2, 1),
       (8744,3, 7, 10, 4, 6),
       (9874,1, 6, 5, 3, 2),
       (5873,4, 2, 9, 1, 4),
       (2664,2, 3, 3, 2, 7),
       (69877,3, 4, 1, 4, 8),
       (25876,1, 8, 7, 3, 5);

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
