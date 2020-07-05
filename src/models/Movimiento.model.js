require('../database/database');
const { Schema, model } = require('mongoose');

const MovimientoSchema = new Schema({
    nroMovimiento: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    detalle: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    indActivo: {
        type: Boolean,
        required: true
    },
    cuenta: {
        type: Schema.Types.ObjectId,
        ref: 'Cuenta'
    }
}, {
    timestamps: true
});

module.exports = model('Movimiento', MovimientoSchema, 'Movimiento');