var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var adminSchema = new Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String,
        },
        tokens: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

var Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
