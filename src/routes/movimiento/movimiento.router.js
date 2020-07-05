const { Router } = require('express');
const router = Router();

const contMovimiento = require('../../controller/movimiento.controller')

  /*****************************/
 /*   OPERACIONES MOVIMIENTO  */
/*****************************/
router.get('/movimiento/operation/get/:idMovimiento', contMovimiento.getMovimiento);
router.get('/movimiento/operation/lst/:idCuenta', contMovimiento.getLstMovimiento);
router.get('/movimiento/operation/ind_activo/:idMovimiento', contMovimiento.getIndActivoMovimiento);

module.exports = router;