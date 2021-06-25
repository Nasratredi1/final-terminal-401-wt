var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type:String,required: true},
  password: {type: String,required: true},
  gender: {type: String, required: true, lowercase: true, enum:['male','female']}
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
