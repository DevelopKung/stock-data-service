const db = {};

db.Members = require("./member.model.js")
db.Products = require("./products.model.js")
db.MemberUser = require("./member-user.model.js")
// db.UseCountProduct = require("./count-product.model.js")
module.exports = db;