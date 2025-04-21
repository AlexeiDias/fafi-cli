import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  dueDate: Date,
  category: String,
  person: String,
  phone: String,
  email: String,
  notes: String,
  recurring: {
    frequency: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
    },
    nextDue: Date,
  },
  lastAlertedAt: Date,
});

const Bill = mongoose.model("Bill", billSchema);

export default Bill;
