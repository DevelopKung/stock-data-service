const db = require("../models");
const MemberUser = db.MemberUser;
const info = require("./../json/message.json");
const bcrypt = require("bcrypt");

module.exports = {

  findAll: async (req, res) => {
    const member_id = req.member.member_id
    MemberUser.find({ member_id }).then((result) => {
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
    MemberUser.findOne({ _id }).then(result => {
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
    
    let user = await MemberUser.findOne({ username: form.username })
    if (user) {
      res.status(403).send({ status: false, message: info.msg_duplicate.replace('{text}', 'ชื่อผู้ใช้') })
      return
    }
    form.password = await bcrypt.hash(req.body.password, 10);
    MemberUser(form).save(form).then((result) => {
      if (result.id) {
        res.status(200).send({ status: true, message: info.msg_success })
      } else {
        res.status(403).send({ status: false, message: info.msg_error })
      }
    }).catch((err) => {
      console.log(err);
      res.status(500).send({ status: false, message: err.message || info.msg_error });
    });
  },

  update: async (req, res) => {
    const _id = req.params.id;
    let form = req.body
    form.updated_date = new Date()
    const member_id = req.member.member_id
    
    MemberUser.findOneAndUpdate({ member_id, _id }, form).then(data => {
      if (data.user_id) {
        res.status(200).send({ status: true, message: info.msg_success })
      } else {
        res.status(404).send({ status: false, message: `${info.msg_error}`})
      }
    }).catch(err => {
      res.status(500).send({ status: false, message: err.message || info.msg_error });
    });
  },

  delete: async (req, res) => {
    const _id  = req.params.id;
    if (_id ) {
      MemberUser.destroy({ _id  }).then(async (data) => {
        res.status(200).send({ status: true, message: info.msg_success })
      }).catch(err => {
        res.status(500).send({ status: false, message: err.message || info.msg_error });
      });
    } else {
      res.status(404).send({ status: false, message: `${info.msg_error}`})
    }
  }
}
