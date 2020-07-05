const { Router } = require('express');
const router = Router();

//const express = require('express')
const bodyParser = require('body-parser');
//const app = express()

const contUser = require('../../controller/user.controller')

/*app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)*/

  /*****************************/
 /*     OPERACIONES USUARO    */
/*****************************/
router.post('/usuario/operation', contUser.postSaveUser);
router.post('/usuario/operation/login', contUser.postLoginUser)
router.put('/usuario/operation', contUser.putUpdateUser);
router.get('/usuario/operation/get/:id', contUser.getUser);
router.get('/usuario/operation/lst', contUser.getLstUser);
router.get('/usuario/operation/ind_activo/:id', contUser.getIndActivoUser);


module.exports = router;