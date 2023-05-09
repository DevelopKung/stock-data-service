module.exports = {
  findAll: async (req, res) => {
    let list_menu = []
    if (req.member) {
      let role = req.member.role[0]
      if (role == 'admin') {
        list_menu = [{
          menu_type: "menu",
          title: "หน้าแรก",
          menu_code: "dashboard",
          route: "/",
          icon: "fas fa-home",
          isAdmin: false
        },
        {
          menu_type: "group-header",
          title: "ตั้งค่าระบบ",
          menu_code: "no_program",
          route: null,
          icon: null,
          isAdmin: true
        },
        {
          menu_type: "menu",
          title: "ข้อมูล",
          menu_code: "products",
          route: "/products",
          icon: "far fa-file-alt",
          isAdmin: false
        },
        {
          menu_type: "menu",
          title: "ข้อมูล ผู้ใช้",
          menu_code: "control-user",
          route: "/control-user",
          icon: "fas fa-users",
          isAdmin: false
        }]
      } else if(role == 'user') {
        list_menu = [{
          menu_type: "menu",
          title: "หน้าแรก",
          menu_code: "dashboard",
          route: "/",
          icon: "fas fa-home",
          isAdmin: false
        },
        {
          menu_type: "menu",
          title: "หน้าแรก",
          menu_code: "form-user",
          route: "/form-user",
          icon: "fas fa-file-alt",
          isAdmin: false
        }]
      }
      res.status(200).send({ status: true, data: list_menu });
    }



  }
}