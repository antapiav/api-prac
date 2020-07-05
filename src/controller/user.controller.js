const User = require('../models/User.model');
const url = require('url');

const postSaveUser = async (request, response) => {
    const { dni, name, email, password, rol, indActivo} = request.body;
    const user = new User({
        dni: dni,
        name: name, 
        email: email, 
        password: password,
        rol: rol,
        indActivo: indActivo
    });
    if(user.password != null || user.password != undefined){
        user.password = await user.encryptPassword(password);
    }
    const body = await user.save();
    response.json({
        body
    });
}
const postLoginUser = async (request, response) => {
    const { user, password} = request.body;
    var session = false;
    var body = await User.findOne({email: user})
    .exec().then(async function (ress) {
        return ress;
    }).catch(async function (err) {
        console.log("ERROR", err);
        return new Array();
    });
    if(!body){
        body = new Object();
        response.json({
            body
        });
    }else{
        session = await body.matchPassword(password, body.password);
        (session) ? body : body = new Object();
        response.json({
            body
        });
    }
}
const putUpdateUser = async (request, response) => {
    const { _id, dni, name, email, password, rol, indActivo} = request.body;
    const body = await User.findByIdAndUpdate(_id, { 
        dni: dni,
        name: name,
        email: email,
        password: password,
        rol: rol,
        indActivo: indActivo
    }).exec().then(async function (ress) {
        return ress;
    }).catch(async function (err) {
        console.log("ERROR", err);
        return new Object();
    });
    response.json({
        body
    });
}
const getUser = async (request, response) => {
    const body = await User.findById(request.params.id)
    .exec().then(async function (ress) {
        return ress;
    }).catch(async function (err) {
        console.log("ERROR", err);
        return new Object();
    });
    response.json({
        body
    });
}
const getLstUser = async (request, response) => {
    const queryObject = url.parse(request.url,true).query;
    const tipo = queryObject.tipo;
    const dato =queryObject.dato;
    var body = new User();
    switch(tipo){
        case "0":
            if(dato.length > 0){
            body = await User.find({dni: new RegExp(dato, 'i')})
                .exec().then(async function (ress) {
                    return ress;
                }).catch(async function (err) {
                    console.log("ERROR", err);
                    return new Array();
                });
            }else{
                body = await User.find()
                .exec().then(async function (ress) {
                    return ress;
                }).catch(async function (err) {
                    console.log("ERROR", err);
                    return new Array();
                });
            }
        break;
        case "1":
            if(dato.length > 0){
                body = await User.find({name: new RegExp(dato, 'i')})
                .exec().then(async function (ress) {
                    return ress;
                }).catch(async function (err) {
                    console.log("ERROR", err);
                    return new Array();
                });
            }else{
                body = await User.find()
                .exec().then(async function (ress) {
                    return ress;
                }).catch(async function (err) {
                    console.log("ERROR", err);
                    return new Array();
                });
            }
        break;
    }
    response.json({
        body
    });
}
const getIndActivoUser = async (request, response) => {
    var code = 404;
    const { MSJ_NOT_FOUND, MSJ_OK } = process.env;
    var message = MSJ_NOT_FOUND;

    const id = request.params.id;
    const indActivoOperation = await User.findByIdAndUpdate(id, { 
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
    postSaveUser,
    postLoginUser,
    putUpdateUser,
    getUser,
    getLstUser,
    getIndActivoUser
}