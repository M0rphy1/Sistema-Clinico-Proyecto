const controller = {};

controller.showHome = async (req, res) => {
  /*  let auth = false;
    let admin = [];
    if (req.session.user) {
        auth = true;
        admin = await Admin.getAdmin(req.session.user);
    } */
  res.render("ADMIN/homeAdmin");
};

module.exports = controller;
