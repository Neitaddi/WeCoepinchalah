const tacheModel = require("../Models/tacheModel");
const clubModel = require("../Models/clubModel");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.AllTachesInfo = async (req, res) => {
  try {
    const tache = await tacheModel.find().select();
    res.send(tache);
    console.log("taches", tache);
  } catch (error) {
    console.log(error);
  }
};

module.exports.createTache = async (req, res) => {
  const newTache = new tacheModel({
    createrId: req.body.createrId,
    tacheClub: req.body.tacheClub,
    tacheDepartment: req.body.tacheDepartment,
    tacheMembre: req.body.tacheMembre,
    tacheObjet: req.body.tacheObjet,
    tacheDescription: req.body.tacheDescription,
    tacheStart: req.body.tacheStart,
    tacheEnd: req.body.tacheEnd,
  });

  try {
    const tache = await newTache.save();
    // add to the follower list
    await clubModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { clubTaches: tache._id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json({ msg1: err });
      }
    );

    return res.status(201).json(tache);
  } catch (err) {
    return res.status(400).send({ msg2: err });
  }
};

module.exports.tacheUpdate = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);
  const updatedRecord = {
    tacheClub: req.body.tacheClub,
    tacheDepartment: req.body.tacheDepartment,
    tacheMembre: req.body.tacheMembre,
    tacheObjet: req.body.tacheObjet,
    tacheDescription: req.body.tacheDescription,
    tacheStart: req.body.tacheStart,
    tacheEnd: req.body.tacheEnd,
  };
  try {
    tacheModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: updatedRecord,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};
module.exports.deleteTache = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await tacheModel.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);
    });
    await clubModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { clubTaches: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
  } catch (error) {
    return res.status(400).send(error);
  }
};
