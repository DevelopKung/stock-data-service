const mongoose = require("../config/mongo.config");
const AutoIncrementFactory = require('mongoose-sequence');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const Schema = mongoose.Schema;

let products = new Schema({
  product_id: { type: Number, index: true, unique: true, auto: true },
  member_id: { type: String, default: null },
  user_id: { type: String, default: null },
  product_row: { type: String, default: null },
  product_code: { type: String, default: null },
  product_name: { type: String, default: null },
  product_size: { type: String, default: null },
  product_qty_box: { type: Number, default: null },
  product_unit: { type: String, default: null },
  product_remark: { type: String, default: null },
  status: { type: Boolean, default: true },
  created_by: { type: String, default: null },
  updated_by: { type: String, default: null },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },

}, { collection: "products" });

products.plugin(aggregatePaginate);
products.plugin(AutoIncrement, { id: 'product_id_counter', inc_field: 'product_id' });

module.exports = mongoose.model("products", products);