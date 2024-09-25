SELECT
    t.NoEmpleado AS NoTecnico,
    t.Nombre + ' ' + t.Apellidos AS NombreTecnico,
    c.NoCuadrilla AS Cuadrilla,
    tr.Descripcion AS TrabajoRealizado,
    s.Titulo AS Servicio,
    CASE WHEN e.EstatusTrabajo = 'Completada' THEN p.Puntos ELSE 0 END AS PuntosGenerados,
    SUM(CASE WHEN e.EstatusTrabajo = 'Completada' THEN p.Puntos ELSE 0 END) 
        OVER (PARTITION BY c.NoCuadrilla, t.IDTecnico) AS TotalPuntosPorTecnico,
    e.EstatusTrabajo AS Estatus,
    cl.NoSuscriptor AS NumSuscriptor,
    cl.Nombre + ' ' + cl.Apellidos AS NombreSuscriptor,
    ot.FechaInicio AS Fecha,
    t.IDTecnico
FROM OrdenTrabajo ot
INNER JOIN Cliente cl ON ot.IDCliente = cl.IDCliente
INNER JOIN Cuadrillas c ON ot.IDCuadrilla = c.IDCuadrilla
INNER JOIN Tecnicos t ON c.IDCuadrilla = t.IDCuadrilla
INNER JOIN Trabajo tr ON ot.IDTrabajo = tr.IDTrabajo
INNER JOIN Servicio s ON ot.IDServicio = s.IDServicio
INNER JOIN PUNTAJE p ON tr.IDPuntaje = p.IDPuntaje
INNER JOIN Estatus e ON e.IDEstatus = ot.IDEstatus
WHERE c.IDCuadrilla = 2
ORDER BY c.NoCuadrilla, t.IDTecnico, ot.FechaInicio DESC;

