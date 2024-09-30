CREATE OR ALTER PROCEDURE sp_CalculoDePuntajeConParametros
    @IDCuadrilla INT,
    @Estatus NVARCHAR(50) = NULL,
    @FechaInicio DATE = NULL,
    @FechaFin DATE = NULL
AS
BEGIN
    SET NOCOUNT ON;
    WITH PuntosTecnicos AS (
        SELECT
            ot.NumeroOrden,  -- Nueva columna agregada
            t.NoEmpleado AS NumTecnico,
            t.Nombre + ' ' + t.Apellidos AS NombreTecnico,
            c.NoCuadrilla AS Cuadrilla,
            tr.Descripcion AS TrabajoRealizado,
            s.Titulo AS Servicio,
            CASE WHEN e.EstatusTrabajo = 'Completada' THEN p.Puntos ELSE 0 END AS PuntosGenerados,
            SUM(CASE WHEN e.EstatusTrabajo = 'Completada' THEN p.Puntos ELSE 0 END)
                OVER (PARTITION BY c.NoCuadrilla, t.IDTecnico) AS TotalPuntosPorTecnico,
            e.EstatusTrabajo AS Estatus,
            cl.NoSuscriptor AS NumCliente,
            cl.Nombre + ' ' + cl.Apellidos AS NombreSuscriptor,
            ot.FechaInicio AS Fecha
        FROM OrdenTrabajo ot
        INNER JOIN Cliente cl ON ot.IDCliente = cl.IDCliente
        INNER JOIN Cuadrillas c ON ot.IDCuadrilla = c.IDCuadrilla
        INNER JOIN Tecnicos t ON c.IDCuadrilla = t.IDCuadrilla
        INNER JOIN Trabajo tr ON ot.IDTrabajo = tr.IDTrabajo
        INNER JOIN Servicio s ON ot.IDServicio = s.IDServicio
        INNER JOIN PUNTAJE p ON tr.IDPuntaje = p.IDPuntaje
        INNER JOIN Estatus e ON e.IDEstatus = ot.IDEstatus
        WHERE c.IDCuadrilla = @IDCuadrilla
        AND (@Estatus IS NULL OR e.EstatusTrabajo = @Estatus)
        AND (@FechaInicio IS NULL OR ot.FechaInicio >= @FechaInicio)
        AND (@FechaFin IS NULL OR ot.FechaInicio <= @FechaFin)
    )
    SELECT
        PT.*,
        b.Pago AS ValorPago
    FROM PuntosTecnicos PT
    LEFT JOIN Rango r ON PT.TotalPuntosPorTecnico BETWEEN r.RangoIn AND ISNULL(r.RangoFin, 2147483647)
    LEFT JOIN Bono b ON r.IDBono = b.IDBono
    ORDER BY PT.Cuadrilla, PT.Fecha DESC;
END

-- Ejemplos de uso:
-- Solo con IDCuadrilla
EXEC sp_CalculoDePuntajeConParametros @IDCuadrilla = 10;

-- Con IDCuadrilla y Estatus
EXEC sp_CalculoDePuntajeConParametros @IDCuadrilla = 4, @Estatus = 'Completada';

-- Con IDCuadrilla y rango de fechas
EXEC sp_CalculoDePuntajeConParametros @IDCuadrilla = 2, @FechaInicio = '2024-09-29', @FechaFin = '2024-10-05';

-- Con todos los par�metros
EXEC sp_CalculoDePuntajeConParametros @IDCuadrilla = 2, @Estatus = 'Completada', @FechaInicio = '2024-01-01', @FechaFin = '2024-03-31';