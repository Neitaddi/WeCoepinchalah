const userModel = require("../Models/userModel");
const clubModel = require("../Models/clubModel");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errorsUtils");

//uploadProfil
module.exports.uploadProfil = async (req, res) => {
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
  const fileName = req.body.name + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  );

  try {
    await userModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { userPicture: "./uploads/profil/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

//uploadProfil
module.exports.uploadProfilClub = async (req, res) => {
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
  const fileName = req.body.name + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/club/${fileName}`
    )
  );

  try {
    await clubModel.findByIdAndUpdate(
      req.params.id,
      { $set: { clubPicture: "./uploads/club/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(500).send({ message: "err1" });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: "err2" });
  }
};

// //uploadProfil
// module.exports.uploadProfilClub = async (req, res) => {
//   console.log("req.body", req.body);
//   try {
//     const photot = await clubModel.findByIdAndUpdate(
//       req.body.id,
//       {
//         $set: {
//           clubPicture: req.body.photo,
//         },
//       },
//       { new: true }
//     );

//     res.send(photot);
//   } catch (error) {
//     console.log(error);
//   }
// };
