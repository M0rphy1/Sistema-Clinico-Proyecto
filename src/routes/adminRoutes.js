const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/ADMIN/usuariosController.js");

// Rutas para Usuarios
router.get("/usuarios", usuariosController.getAllUsuarios);
router.post("/usuarios", usuariosController.createUsuario);
router.put("/usuarios/:nombreUsuario", usuariosController.updateUsuario);
router.delete("/usuarios/:nombreUsuario", usuariosController.deleteUsuario);
router.get("/contadoresAdmin", usuariosController.getContadoresAdmin);

module.exports = router;

