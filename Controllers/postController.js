const postModel = require("../Models/postModel");
const clubModel = require("../Models/clubModel");
const userModel = require("../Models/userModel");

const { uploadErrors } = require("../utils/errorsUtils");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

//readPost
module.exports.readPost = (req, res) => {
  postModel
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    })
    .sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res) => {
  let fileName;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${fileName}`
      )
    );
  }

  const newPost = new postModel({
    posterId: req.body.posterId,
    posterClub: req.body.posterClub,
    postMessage: req.body.postMessage,
    postPicture: req.body.file !== null ? "./uploads/posts/" + fileName : "",
    postVideo: req.body.postVideo,
    postLikers: [],
    postComments: [],
  });
  try {
    const post = await newPost.save();
    console.log(req.params);
    // add to the follower list
    await clubModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { clubPostes: post._id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );

    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

// ................................
// module.exports.createClub = async (req, res) => {
//   const newClub = new clubModel({
//     createrId: req.body.createrId,
//     clubName: req.body.clubName,
//     clubCategorie: req.body.clubCategorie,
//     clubDescription: req.body.clubDescription,
//     clubLocatioun: req.body.clubLocatioun,
//     clubPhone: req.body.clubPhone,
//     clubEmail: req.body.clubEmail,
//     clubWebSite: req.body.clubWebSite,
//   });

//   try {
//     const club = await newClub.save();
//     // add to the follower list
//     await userModel
//       .findByIdAndUpdate(
//         req.params.id,
//         { $addToSet: { userClubs: club._id } },
//         { new: true, upsert: true },
//         (err, docs) => {
//           if (!err) res.status(201).json(docs);
//           else return res.status(400).jsos(err);
//         }
//       )
//       .populate("createrId");
//     return res.status(201).json(club);
//   } catch (err) {
//     return res.status(400).send(err);
//   }
// };
// .......................

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    postMessage: req.body.postMessage,
  };

  postModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  postModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

// //like post
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await postModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { postLikers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await userModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { userLikes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

//unlikePost
module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await postModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { postLikers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await userModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { userLikes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

//comment Pst
module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return postModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          postComments: {
            commenterId: req.body.commenterId,
            commentUserName: req.body.commentUserName,
            commentUserLastName: req.body.commentUserLastName,
            commentText: req.body.commentText,
            commentTimestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// //editCommentPost
module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return postModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.postComments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.commentText = req.body.commentText;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
//deleteCommentPost
module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return postModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          postComments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
