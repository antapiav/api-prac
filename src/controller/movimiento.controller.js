const Movimiento = require('../models/Movimiento.model');
const Cuenta = require('../models/Cuenta.model');
const User = require('../models/User.model');

const url = require('url');

const getMovimiento = async (request, response) => {
    var body = await Movimiento.findById(request.params.idMovimiento)
    .exec().then(async function (ressMovimiento) {
        var cuenta = await Cuenta.findById(ressMovimiento.cuenta)
        .exec().then(async function (ressCuenta) {
            return ressCuenta;
        }).catch(async function (err) {
            console.log("ERROR", err);
            return new Array();
        });
        ressMovimiento.cuenta = cuenta;
        return ressMovimiento;
    }).catch(async function (err) {
        console.log("ERROR", err);
        return new Array();
    });
    response.json({
        body
    });
}
const getLstMovimiento = async (request, response) => {
    var idCuenta = request.params.idCuenta;
    body = await Movimiento.find({cuenta: idCuenta})
    .exec().then(async function (ressMovimiento) {
        return ressMovimiento;
    }).catch(async function (err) {
        console.log("ERROR", err);
        return new Array();
    });
    if(body.length > 0){
        for(let i in body){
            cuenta = await Cuenta.findById(body[i].cuenta)
            .exec().then(async function (ressCuenta) {
                return ressCuenta;
            }).catch(async function (err) {
                console.log("ERROR", err);
                return new Array();
            });
            body[i].cuenta = cuenta;
            //body[i].cuenta.user = await User.findById(body[i].cuenta.user);
        }
    }
    
    response.json({
        body
    });
}
const getIndActivoMovimiento = async (request, response) => {
    var code = 404;
    const { MSJ_NOT_FOUND, MSJ_OK } = process.env;
    var message = MSJ_NOT_FOUND;

    const id = request.params.idMovimiento;
    const indActivoOperation = await Movimiento.findByIdAndUpdate(id, { 
        indActivo: true
    }).exec().then(async function (ress) {
        return true;
    }).catch(async function (err) {
        console.log("ERROR", err);
        return false;
    });
    if(indActivoOperation){
        code = 200;
        message = MSJ_OK;
    }
    response.json({
        code,
        message
    });
}

module.exports = {
    getMovimiento,
    getLstMovimiento,
    getIndActivoMovimiento
}