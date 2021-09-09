const mongoose = require("mongoose");

const tacheSchema = new mongoose.Schema(
  {
    createrId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    tacheClub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "club",
    },
    tacheDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "department",
    },
    tacheMembre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "membre",
    },
    tacheObjet: {
      type: String,
    },
    tacheDescription: {
      type: String,
      maxlength: 500,
    },

    tacheStart: {
      type: String,
    },
    tacheEnd: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const tacheModel = mongoose.model("tache", tacheSchema);
module.exports = tacheModel;
