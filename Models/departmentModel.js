const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentCreaterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    departmentClub: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "club",
    },
    departmentBoss: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    departmentMember: {
      type: [String],
    },
    departmentDescription: {
      type: String,
      max: 1024,
      required: true,
    },
    departmentRole: {
      type: String,
      max: 1024,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = departmentModel = mongoose.model(
  "department",
  departmentSchema
);
