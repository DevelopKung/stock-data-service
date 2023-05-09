const mongoose = require("../config/mongo.config");
const AutoIncrementFactory = require('mongoose-sequence');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const Schema = mongoose.Schema;

let count_products = new Schema({
  cp_id: { type: Number, index: true, unique: true, auto: true },
  user_id: { type: String, default: null},
  cp_row: { type: String, default: null },
  cp_code: { type: String, default: null },
  cp_name: { type: String, default: null },
  cp_size: { type: String, default: null },
  cp_qty_box: { type: Number, default: null },
  cp_unit: { type: String, default: null },
  cp_remark: { type: String, default: null },
  created_by: { type: String, default: null },
  updated_by: { type: String, default: null },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
}, { collection: "count_products" });

count_products.plugin(aggregatePaginate);
count_products.plugin(AutoIncrement, { id: 'cp_id_counter', inc_field: 'cp_id' });

module.exports = mongoose.model("count_products", count_products);

