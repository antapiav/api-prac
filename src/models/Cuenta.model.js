require('../database/database');
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const CuentaSchema = new Schema({
    nroCuenta: {
        type: String,
        required: true
    },
    nroCCI: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    montoDisponible: {
        type: Number,
        required: true
    },
    indActivo: {
        type: Boolean,
        required: true
    },
    user:  {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    /*usuario:  [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]*/
}, {
    timestamps: true
});

module.exports = model('Cuenta', CuentaSchema, 'Cuenta');