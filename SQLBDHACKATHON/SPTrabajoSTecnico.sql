CREATE OR ALTER PROCEDURE sp_TrabajoSemanalTecnico
    @IDTecnico INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Calcular las fechas de la semana actual (lunes a sábado)
    DECLARE @FechaInicio DATE = DATEADD(DAY, 1-DATEPART(WEEKDAY, GETDATE()), CAST(GETDATE() AS DATE))
    DECLARE @FechaFin DATE = DATEADD(DAY, 5, @FechaInicio) -- Sábado

    -- Obtener información del técnico
    DECLARE @NombreTecnico NVARCHAR(300), @NoCuadrilla INT
    SELECT @NombreTecnico = Nombre + ' ' + Apellidos, @NoCuadrilla = NoCuadrilla
    FROM Tecnicos t
    JOIN Cuadrillas c ON t.IDCuadrilla = c.IDCuadrilla
    WHERE t.IDTecnico = @IDTecnico

    -- Calcular trabajo semanal y mostrar resultados
    ;WITH TrabajoSemanal AS (
        SELECT
            ot.FechaInicio AS Fecha,
            tr.Descripcion AS TrabajoRealizado,
            s.Titulo AS Servicio,
            CASE WHEN e.EstatusTrabajo = 'Completada' THEN p.Puntos ELSE 0 END AS PuntosGenerados,
            cl.NoSuscriptor AS NumSuscriptor,
            cl.Nombre + ' ' + cl.Apellidos AS NombreSuscriptor,
            e.EstatusTrabajo AS Estatus,
            0 AS EsResumen -- Columna para ordenar
        FROM OrdenTrabajo ot
        INNER JOIN Trabajo tr ON ot.IDTrabajo = tr.IDTrabajo
        INNER JOIN Servicio s ON ot.IDServicio = s.IDServicio
        INNER JOIN PUNTAJE p ON tr.IDPuntaje = p.IDPuntaje
        INNER JOIN Estatus e ON e.IDEstatus = ot.IDEstatus
        INNER JOIN Cliente cl ON ot.IDCliente = cl.IDCliente
        WHERE ot.IDCuadrilla = (SELECT IDCuadrilla FROM Tecnicos WHERE IDTecnico = @IDTecnico)
          AND ot.FechaInicio BETWEEN @FechaInicio AND @FechaFin

        UNION ALL

        SELECT
            @FechaFin AS Fecha,
            'RESUMEN' AS TrabajoRealizado,
            NULL AS Servicio,
            SUM(CASE WHEN e.EstatusTrabajo = 'Completada' THEN p.Puntos ELSE 0 END) AS PuntosGenerados,
            COUNT(*) AS NumSuscriptor,
            CAST(SUM(CASE WHEN e.EstatusTrabajo = 'Completada' THEN 1 ELSE 0 END) AS NVARCHAR(10)) + ' completadas' AS NombreSuscriptor,
            'Total' AS Estatus,
            1 AS EsResumen -- Columna para ordenar
        FROM OrdenTrabajo ot
        INNER JOIN Trabajo tr ON ot.IDTrabajo = tr.IDTrabajo
        INNER JOIN PUNTAJE p ON tr.IDPuntaje = p.IDPuntaje
        INNER JOIN Estatus e ON e.IDEstatus = ot.IDEstatus
        WHERE ot.IDCuadrilla = (SELECT IDCuadrilla FROM Tecnicos WHERE IDTecnico = @IDTecnico)
          AND ot.FechaInicio BETWEEN @FechaInicio AND @FechaFin
    )
    SELECT
        @NombreTecnico AS NombreTecnico,
        @NoCuadrilla AS NoCuadrilla,
        Fecha,
        TrabajoRealizado,
        Servicio,
        PuntosGenerados,
        NumSuscriptor,
        NombreSuscriptor,
        Estatus,
        CASE 
            WHEN EsResumen = 1 THEN 
                (SELECT TOP 1 Pago FROM Bono b 
                 JOIN Rango r ON b.IDBono = r.IDBono 
                 WHERE PuntosGenerados BETWEEN r.RangoIn AND ISNULL(r.RangoFin, 2147483647))
            ELSE NULL
        END AS BonoSemanal
    FROM TrabajoSemanal
    ORDER BY EsResumen, Fecha, PuntosGenerados DESC
END

EXEC sp_TrabajoSemanalTecnico @IDTecnico = 20;