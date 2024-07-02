const express = require("express");
const router = express.Router();


const usuariosController = require("../controllers/ADMIN/usuariosController.js");
// Rutas para Admins
// Rutas para Usuarios
router.get("/usuarios", usuariosController.getAllUsuarios);
router.post("/usuarios", usuariosController.createUsuario);
router.put("/usuarios/:idUsuario", usuariosController.updateUsuario);
router.delete("/usuarios/:idUsuario", usuariosController.deleteUsuario);
router.get("/contadoresAdmin", usuariosController.getContadoresAdmin);

//rutas para mascotas
module.exports = router;
