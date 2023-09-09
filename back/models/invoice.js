const db = require('../database/models');

const getInvoiceByOrderID = async (order_id) => {
    try {
        const result = await db.Invoice.findOne({where: {order_id: order_id}})
        if(result) {
            return result;
        } else {
            return null;
        }
    } catch (error) {
        console.log(`Error al obtener las facturas por orden_id: ${error}`);
    }
}

const invoice = {
    getInvoiceByOrderID: getInvoiceByOrderID,
}

module.exports = invoice;