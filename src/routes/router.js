const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/imageStorage'),
    filename: (_req, file, cb) => (
        cb(null, Date.now() + '_' + file.originalname)
    )
});

const upload = multer({ 
    storage,
    limits: {fileSize: 5000000},
    fileFilter: (_req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: El archivo seleccionado debe ser una imágen");
    }
}).single('image');

//Llamando a los controladores
const homeController = require('../controllers/homeController.js');

//Rutas para Inicio
router.get('/', homeController.showHome);
router.get('/ayuda', homeController.showAyuda);


module.exports = router;