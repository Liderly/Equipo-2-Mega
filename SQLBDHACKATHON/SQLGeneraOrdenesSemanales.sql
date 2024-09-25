-- Generar órdenes de trabajo para una semana (Lunes a Sábado)
DECLARE @FechaInicio DATE = DATEADD(DAY, -DATEPART(WEEKDAY, GETDATE()) + 2, GETDATE());
DECLARE @FechaFin DATE = DATEADD(DAY, 5, @FechaInicio);

-- Obtener el ID del estatus 'Completada'
DECLARE @IDEstatusCompletada INT = (SELECT TOP 1 IDEstatus FROM Estatus WHERE EstatusTrabajo = 'Completada');

-- Obtener el número total de clientes y servicios
DECLARE @TotalClientes INT = (SELECT COUNT(*) FROM Cliente);
DECLARE @TotalServicios INT = (SELECT COUNT(*) FROM Servicio);

-- Eliminar órdenes existentes en el rango de fechas (si las hay)
DELETE FROM OrdenTrabajo WHERE FechaInicio BETWEEN @FechaInicio AND @FechaFin;

-- Generar órdenes para cada cuadrilla
DECLARE @IDCuadrilla INT = 1;
WHILE @IDCuadrilla <= 10 -- Asumiendo que hay 10 cuadrillas
BEGIN
    -- Determinar el número de órdenes para esta cuadrilla (entre 15 y 25)
    DECLARE @NumOrdenes INT = FLOOR(RAND() * (26 - 15) + 15);
    
    DECLARE @OrdenActual INT = 1;
    WHILE @OrdenActual <= @NumOrdenes
    BEGIN
        -- Seleccionar una fecha aleatoria dentro del rango
        DECLARE @FechaOrden DATE = DATEADD(DAY, FLOOR(RAND() * 6), @FechaInicio);
        
        -- Seleccionar un trabajo aleatorio
        DECLARE @IDTrabajo INT = CAST(RAND() * 4 + 1 AS INT);

        INSERT INTO OrdenTrabajo (FechaInicio, IDEstatus, IDCuadrilla, IDCliente, IDTrabajo, IDServicio)
        VALUES (
            @FechaOrden,
            @IDEstatusCompletada,
            @IDCuadrilla,
            CAST(RAND() * @TotalClientes + 1 AS INT),
            @IDTrabajo,
            CAST(RAND() * @TotalServicios + 1 AS INT)
        );

        SET @OrdenActual = @OrdenActual + 1;
    END

    SET @IDCuadrilla = @IDCuadrilla + 1;
END

-- Mostrar resumen de órdenes generadas con puntos calculados según el rango
SELECT 
    c.NoCuadrilla,
    COUNT(*) AS TotalOrdenes,
    SUM(p.Puntos) AS PuntosTotales,
    CASE 
        WHEN SUM(p.Puntos) BETWEEN (SELECT MIN(RangoIn) FROM Rango) AND (SELECT MAX(RangoFin) FROM Rango WHERE RangoFin IS NOT NULL) 
        THEN (SELECT TOP 1 b.Pago FROM Rango r JOIN Bono b ON r.IDBono = b.IDBono WHERE SUM(p.Puntos) BETWEEN r.RangoIn AND ISNULL(r.RangoFin, 2147483647))
        ELSE (SELECT TOP 1 Pago FROM Bono ORDER BY Pago DESC)
    END AS Bono
FROM OrdenTrabajo ot
JOIN Cuadrillas c ON ot.IDCuadrilla = c.IDCuadrilla
JOIN Trabajo t ON ot.IDTrabajo = t.IDTrabajo
JOIN PUNTAJE p ON t.IDPuntaje = p.IDPuntaje
WHERE ot.FechaInicio BETWEEN @FechaInicio AND @FechaFin
GROUP BY c.NoCuadrilla
ORDER BY c.NoCuadrilla;

-- Mostrar el total general de órdenes
SELECT COUNT(*) AS TotalOrdenesGeneradas
FROM OrdenTrabajo
WHERE FechaInicio BETWEEN @FechaInicio AND @FechaFin;