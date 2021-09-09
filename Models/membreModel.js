const mongoose = require("mongoose");

const membreSchema = new mongoose.Schema(
  {
    membreCreaterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    membreDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "department",
    },
    membreBoss: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    membreRole: {
      type: String,
      max: 1024,
    },
  },
  {
    timestamps: true,
  }
);

const membreModel = mongoose.model("membre", membreSchema);
module.exports = membreModel;
