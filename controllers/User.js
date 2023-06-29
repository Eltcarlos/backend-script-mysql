
const {getConnection, sql } = require('../database/config')

const history_consumption_by_section = async (req, res) => {
       const {startDate, endDate} = req.body
    try {
        const pool = await getConnection();
        const query = `
        SELECT 
        c.linea, 
        c.cliente, 
        c.fecha, 
        c.dato AS consumo,
        p.dato AS perdidas, 
        co.dato AS costo
        FROM CONSUMO_POR_TRAMO c
        JOIN PERDIDA_POR_TRAMO p 
        ON c.linea = p.linea AND c.cliente = p.cliente AND c.fecha = p.fecha
        JOIN COSTO_POR_TRAMO co ON c.linea = co.linea AND c.cliente = co.cliente AND c.fecha = co.fecha
        WHERE c.fecha BETWEEN @startDate AND @endDate
      `;
        const result = await pool
        .request()
        .input("startDate", startDate)
        .input("endDate", endDate)
        .query(query);
        return res.status(201).json(result.recordsets[0]);
    } catch (error) {
      return res.status(501).json({
        success: false,
        message: 'Hubo un error al momento de obtener el historial de consumos',
        error
      });
    }
  };

const history_consumption_by_client = async (req, res) => {
    const {startDate, endDate} = req.body
 try {
     const pool = await getConnection();
     const query = `
     SELECT 
     c.cliente, 
     c.linea, 
     c.fecha, 
     c.dato AS consumo, 
     p.dato AS perdidas, 
     co.dato AS costo
     FROM CONSUMO_POR_TRAMO c
     JOIN PERDIDA_POR_TRAMO p ON c.linea = p.linea AND c.cliente = p.cliente AND c.fecha = p.fecha
     JOIN COSTO_POR_TRAMO co ON c.linea = co.linea AND c.cliente = co.cliente AND c.fecha = co.fecha
     WHERE c.fecha BETWEEN @startDate AND @endDate
   `;
     const result = await pool
     .request()
     .input("startDate", startDate)
     .input("endDate", endDate)
     .query(query);
     return res.status(201).json(result.recordsets[0]);
 } catch (error) {
   return res.status(501).json({
     success: false,
     message: 'Hubo un error al momento de obtener el historial de consumos',
     error
   });
 }
};



const top_20_Worst_Customers = async (req, res) => {
    const {startDate, endDate} = req.body
 try {
     const pool = await getConnection();
     const query = `
     SELECT TOP 20 
     c.cliente, 
     c.linea, 
     p.dato AS perdidas
     FROM CONSUMO_POR_TRAMO c
     JOIN PERDIDA_POR_TRAMO p ON c.linea = p.linea AND c.cliente = p.cliente AND c.fecha = p.fecha
     WHERE c.fecha BETWEEN @startDate AND @endDate
     ORDER BY perdidas DESC
   `;
     const result = await pool
     .request()
     .input("startDate", startDate)
     .input("endDate", endDate)
     .query(query);
     return res.status(201).json(result.recordsets[0]);
 } catch (error) {
   return res.status(501).json({
     success: false,
     message: 'Hubo un error al momento de obtener el historial de consumos',
     error
   });
 }
};


module.exports = {
    history_consumption_by_section,
    history_consumption_by_client,
    top_20_Worst_Customers
}