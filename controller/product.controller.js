const db = require("../models");
const Products = db.Products;
const info = require("./../json/message.json");
const fc = require("./../service/function");
module.exports = {

  findAll: async (req, res) => {
    const member_id = req.member.member_id
    Products.find({ member_id }).then((result) => {
      if (result) {
        res.status(200).send({ status: true, message: info.msg_success, payload: result });
      } else {
        res.status(403).send({ status: false, message: info.msg_not_found });
      }
    }).catch((err) => {
      res.status(500).send({ status: false, message: err.message || info.msg_error });
    });
  },

  findOne: async (req, res) => {
    const _id = req.params.id;
    Products.findOne({ _id }).then(result => {
      if (result) {
        res.status(200).send({ status: true, message: info.msg_success, payload: result });
      } else {
        res.status(403).send({ status: false, message: info.msg_not_found });
      }
    }).catch((err) => {
      res.status(500).send({ status: false, message: err.message || info.msg_error });
    });
  },

  create: async (req, res) => {
    let form = req.body
    form.member_id = req.member.member_id
    form.created_by = form.created_by

    let prod = await Products.findOne({ product_code: form.product_code })
    if (prod) {
      res.status(403).send({ status: false, message: info.msg_duplicate.replace('{text}', 'สินค้า') })
      return
    }

    Products.create(form).then((result) => {
      if (result.product_id) {
        res.status(200).send({ status: true, message: info.msg_success })
      } else {
        res.status(403).send({ status: false, message: info.msg_error })
      }
    }).catch((err) => {
      res.status(500).send({ status: false, message: err.message || info.msg_error });
    });
  },

  update: async (req, res) => {
    const _id = req.params.id;
    let form = req.body
    form.updated_date = new Date()

    Products.findOneAndUpdate({ _id } ,form).then(data => {
      if (data._id) {
        res.status(200).send({ status: true, message: info.msg_success })
      } else {
        res.status(404).send({ status: false, message: `${info.msg_error}`})
      }
    }).catch(err => {
      res.status(500).send({ status: false, message: err.message || info.msg_error });
    });
  },

  delete: async (req, res) => {
    const _id = req.params.id;
    if (_id) {
      Products.destroy({ _id }).then(async (data) => {
        res.status(200).send({ status: true, message: info.msg_success })
      }).catch(err => {
        res.status(500).send({ status: false, message: err.message || info.msg_error });
      });
    } else {
      res.status(404).send({ status: false, message: `${info.msg_error}`})
    }
  },

  import: async (req, res) => {
    const _id = req.params.id;
    const file = req.file;
    if (file && _id) {
      try {
        let data = fc.convertExcelToJson(file, req.member.member_id)
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          await Products.create(element)
        }
        res.status(200).send({ status: true, message: info.msg_success })
      } catch (error) {
        res.status(500).send({ status: false, message: `${info.msg_error}`})
      }
    } else {
      res.status(404).send({ status: false, message: `${info.msg_error}`})
    }
  }
}
