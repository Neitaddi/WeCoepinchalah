const mongoose = require("mongoose");
//automatcly validator email
const { isEmail } = require("validator");
const clubSchema = new mongoose.Schema(
  {
    createrId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    clubName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 55,
      trim: true,
    },
    clubCategorie: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 55,
      trim: true,
    },
    clubDescription: {
      type: String,
      max: 1024,
      required: true,
    },
    clubLocatioun: {
      type: String,
      required: true,
    },
    clubPhone: {
      type: Number,
      maxLength: 8,
      minLength: 8,
      trim: true,
      required: true,
    },
    clubEmail: {
      type: String,
      required: true,
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
  },

  {
    timestamps: true,
  }
);

module.exports = clubModel = mongoose.model("club", clubSchema);
