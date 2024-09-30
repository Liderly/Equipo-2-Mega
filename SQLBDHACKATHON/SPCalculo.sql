CREATE OR ALTER PROCEDURE sp_CalculoDePuntaje
    @IDCuadrilla INT
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
    )
    SELECT
        PT.*,
        b.Pago AS ValorPago
    FROM PuntosTecnicos PT
    LEFT JOIN Rango r ON PT.TotalPuntosPorTecnico BETWEEN r.RangoIn AND ISNULL(r.RangoFin, 2147483647)
    LEFT JOIN Bono b ON r.IDBono = b.IDBono
    ORDER BY PT.Cuadrilla, PT.Fecha DESC;
END

-- Ejemplo de uso:
EXEC sp_CalculoDePuntaje @IDCuadrilla=10;


CREATE OR ALTER PROCEDURE sp_CalculoDePuntajeTodasCuadrillas
AS
BEGIN
    SET NOCOUNT ON;
    WITH PuntosTecnicos AS (
        SELECT
            ot.NumeroOrden,
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
    )
    SELECT
        PT.*,
        b.Pago AS ValorPago
    FROM PuntosTecnicos PT
    LEFT JOIN Rango r ON PT.TotalPuntosPorTecnico BETWEEN r.RangoIn AND ISNULL(r.RangoFin, 2147483647)
    LEFT JOIN Bono b ON r.IDBono = b.IDBono
    ORDER BY PT.Cuadrilla, PT.Fecha DESC;
END

-- Ejemplo de uso:
EXEC sp_CalculoDePuntajeTodasCuadrillas;