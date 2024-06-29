const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/imageStorage"),
  filename: (_req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (_req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: El archivo seleccionado debe ser una imagen");
  },
}).single("image");

const adminController = require("../controllers/ADMIN/homeController.js");
const usuariosController = require("../controllers/ADMIN/usuariosController.js");
usuariosController
// Rutas para Admins
router.get("/", adminController.showHome);

// Rutas para Usuarios
router.get("/usuarios", usuariosController.showViewUsuarios);
router.post("/usuarios", usuariosController.createUsuario);
router.put("/usuarios/:idUsuario", usuariosController.updateUsuario);
router.delete("/usuarios/:idUsuario", usuariosController.deleteUsuario);


//rutas para mascotas
module.exports = router;
