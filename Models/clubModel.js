const mongoose = require("mongoose");
//automatcly validator email
const { isEmail } = require("validator");
const clubSchema = new mongoose.Schema(
  {
    createrId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    clubName: {
      type: String,

      minLength: 2,
      maxLength: 55,
      trim: true,
    },
    clubCategorie: {
      type: String,

      minLength: 2,
      maxLength: 55,
      trim: true,
    },
    clubDescription: {
      type: String,
      max: 1024,
    },
    clubLocatioun: {
      type: String,
    },
    clubPhone: {
      type: Number,
      maxLength: 8,
      minLength: 8,
      trim: true,
    },
    clubEmail: {
      type: String,

      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    clubWebSite: {
      type: String,
    },
    clubPicture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
    clubPostes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    clubDepartments: {
      type: [String],
    },
    clubTaches: {
      type: [String],
    },
  },

  {
    timestamps: true,
  }
);

const clubModel = mongoose.model("club", clubSchema);
module.exports = clubModel;
