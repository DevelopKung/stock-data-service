const mongoose = require("../config/mongo.config");
const AutoIncrementFactory = require('mongoose-sequence');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const Schema = mongoose.Schema;

let memberUser = new Schema({
  user_id: { type: Number, index: true, unique: true, auto: true },
  member_id: { type: String, default: null },
  username: { type: String, default: null},
  password: { type: String, default: null },
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  role: { type: String, default: "user" },
  status: { type: Boolean, default: true },
  created_by: { type: String, default: null },
  updated_by: { type: String, default: null },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },

}, { collection: "member_user" });

memberUser.plugin(aggregatePaginate);
memberUser.plugin(AutoIncrement, { id: 'user_id_counter', inc_field: 'user_id' });

module.exports = mongoose.model("member_user", memberUser);