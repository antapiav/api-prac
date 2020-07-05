const { Router } = require('express');
const router = Router();

const contCuenta = require('../../controller/cuenta.controller')

  /*****************************/
 /*     OPERACIONES cuenta    */
/*****************************/
router.get('/cuenta/operation/get/:idCuenta', contCuenta.getCuenta);
router.get('/cuenta/operation/lst/:idUsuario', contCuenta.getLstCuenta);
router.get('/cuenta/operation/ind_activo/:idCuenta', contCuenta.getIndActivoCuenta);

module.exports = router;