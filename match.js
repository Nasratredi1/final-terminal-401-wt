var mongoose = require("mongoose");

var matchSchema = mongoose.Schema({
  teama:{type: String, required: true, enum:['Karachi Kings','Multan Sultan', 'Peshawer Zalmi','Lahore Qalanders','Islamabad United','Quetta Gladiators']},
  teamb: {type: String, required: true, enum:['Karachi Kings','Multan Sultan', 'Peshawer Zalmi','Lahore Qalanders','Islamabad United','Quetta Gladiators']},
  city: {type: String, required: true},
  date: {type: Date, default: Date.now}
});
const Matches = mongoose.model("Match", matchSchema);
module.exports = Matches;
