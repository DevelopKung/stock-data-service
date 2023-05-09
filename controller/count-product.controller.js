const db = require("../models");
const UseCountProduct = db.UseCountProduct;
const Products = db.Products;
const info = require("../json/message.json");

function convertNumber(params) {
  try {
    if (typeof params == 'number') {
      return params
    } else {
      return parseInt(params)
    }
  } catch (error) {
    return params
  }
}

module.exports = {

  findAll: async (req, res) => {
    try {
      const member_id = req.member.member_id
      let result = await Products.find({ member_id, status: true })
      if (result && result.length > 0) {
        res.status(200).send({ status: true, message: info.msg_success, payload: result });
      } else {
        res.status(403).send({ status: false, message: info.msg_not_found });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ status: false, message: err.message || info.msg_error });
    }
  },

  findOne: async (req, res) => {
    try {
      const _id = req.params.id;
      let result = await Products.findOne({ _id })
      if (result) {
        res.status(200).send({ status: true, message: info.msg_success, payload: result });
      } else {
        res.status(403).send({ status: false, message: info.msg_not_found });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ status: false, message: err.message || info.msg_error });
    }
  },

  create: async (req, res) => {
    let form = req.body
    form.cp_qty_box = convertNumber(form.cp_qty_box)
    form.user_id = req.member.user_id
    console.log(form);
    try {
      let result = await UseCountProduct.create(form)
      if (result._id) {
        res.status(200).send({ status: true, message: info.msg_success })
      } else {
        res.status(404).send({ status: false, message: `${info.msg_error}` })
      }
    } catch (error) {
      res.status(500).send({ status: false, message: error.message || info.msg_error });
    }
  },

  update: async (req, res) => {
    const _id = req.params.id;
    let form = req.body
    form.updated_date = new Date()
    Products.findOneAndUpdate({ _id }, form).then(data => {
      if (data._id) {
        res.status(200).send({ status: true, message: info.msg_success })
      } else {
        res.status(404).send({ status: false, message: `${info.msg_error}` })
      }
    }).catch(err => {
      res.status(500).send({ status: false, message: err.message || info.msg_error });
    });
  },

  delete: async (req, res) => {
    const _id = req.params.id;
    if (_id) {
      UseCountProduct.destroy({ _id }).then(async (data) => {
        res.status(200).send({ status: true, message: info.msg_success })
      }).catch(err => {
        res.status(500).send({ status: false, message: err.message || info.msg_error });
      });
    } else {
      res.status(404).send({ status: false, message: `${info.msg_error}` })
    }
  }
}
