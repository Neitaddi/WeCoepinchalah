const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    postMessage: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    postPicture: {
      type: String,
    },
    postVideo: {
      type: String,
    },
    postLikers: {
      type: [String],
      required: true,
    },
    postComments: {
      type: [
        {
          commenterId: String,
          commentUserName: String,
          commentUserLastName: String,
          commentText: String,
          commentTimestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = postModel = mongoose.model("post", postSchema);