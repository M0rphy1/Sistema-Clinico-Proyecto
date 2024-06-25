const controller = {};
//const Admin = require("../models/adminModel.js");

controller.showHome = async (req, res) => {
  /*  let auth = false;
    let admin = [];
    if (req.session.user) {
        auth = true;
        admin = await Admin.getAdmin(req.session.user);
    } */
  res.render("home");
};

controller.showAyuda = async (req, res) => {
  /*  let auth = false;
    let admin = [];
    if (req.session.user) {
        auth = true;
        admin = await Admin.getAdmin(req.session.user);
    } */
  res.render("ayuda");
};

module.exports = controller;
