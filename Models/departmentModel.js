const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentCreaterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    departmentClub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "club",
    },
    departmentBoss: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    departmentMember: {
      type: [String],
    },
    departmentDescription: {
      type: String,
      max: 1024,
    },
    departmentRole: {
      type: String,
      max: 1024,
    },
  },
  {
    timestamps: true,
  }
);

const departmentModel = mongoose.model("department", departmentSchema);
module.exports = departmentModel;
