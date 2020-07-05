const Cuenta = require('../models/Cuenta.model');
const User = require('../models/User.model');

const getCuenta = async (request, response) => {
    var body = await Cuenta.findById(request.params.idCuenta)
    .exec().then(async function (ressCuenta) {
        var user = await User.findById(ressCuenta.user)
        .exec().then(async function (ressUser) {
            return ressUser;
        }).catch(async function (err) {
            console.log("ERROR", err);
            return new Array();
        });
        ressCuenta.user = user;
        return ressCuenta;
    }).catch(async function (err) {
        console.log("ERROR", err);
        return new Array();
    });

    response.json({
        body
    });
}
const getLstCuenta = async (request, response) => {
    var idUsuario = request.params.idUsuario;
    //body = await Cuenta.find({user: idUsuario})
    body = await Cuenta.find()
    .exec().then(async function (ressCuenta) {
        return ressCuenta;
    }).catch(async function (err) {
        console.log("ERROR", err);
        return new Array();
    });
    response.json({
        body
    });
}
const getIndActivoCuenta = async (request, response) => {
    var code = 404;
    const { MSJ_NOT_FOUND, MSJ_OK } = process.env;
    var message = MSJ_NOT_FOUND;

    const id = request.params.idCuenta;
    const indActivoOperation = await Cuenta.findByIdAndUpdate(id, { 
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
    getCuenta,
    getLstCuenta,
    getIndActivoCuenta
}