const membreModel = require("../Models/membreModel");
const departmentModel = require("../Models/departmentModel");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.createMembre = async (req, res) => {
  const newMembre = new membreModel({
    membreCreaterId: req.body.membreCreaterId,
    membreDepartment: req.body.membreDepartment,
    membreBoss: req.body.membreBoss,
    membreRole: req.body.membreRole,
  });
  try {
    const membre = await newMembre.save();
    console.log(req.params);
    // add to the follower list
    await departmentModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { departmentMember: membre._id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );

    return res.status(201).json(membre);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.AllMembresInfo = async (req, res) => {
  try {
    const membre = await membreModel.find().select();
    res.send(membre);
    console.log("membre", membre);
  } catch (error) {
    console.log(error);
  }
};

// ..................................
//update department
module.exports.membreUpdate = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);
  const updatedRecord = {
    membreBoss: req.body.membreBoss,
    membreRole: req.body.membreRole,
  };
  try {
    membreModel.findByIdAndUpdate(
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

module.exports.deleteMembre = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await membreModel.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);
    });
    await departmentModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { departmentMember: req.params.id } },
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
