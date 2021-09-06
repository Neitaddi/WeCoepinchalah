const departmentModel = require("../Models/departmentModel");
const clubModel = require("../Models/clubModel");
const ObjectID = require("mongoose").Types.ObjectId;

//readdepartmentModel
// module.exports.readDepartment = (req, res) => {
//   departmentModel
//     .find((err, docs) => {
//       if (!err) res.send(docs);
//       else console.log("Error to get data : " + err);
//     })
//     .sort({ createdAt: -1 });
// };

module.exports.createDepartment = async (req, res) => {
  const newDepartment = new departmentModel({
    departmentCreaterId: req.body.departmentCreaterId,
    departmentClub: req.body.departmentClub,
    departmentBoss: req.body.departmentBoss,
    departmentDescription: req.body.departmentDescription,
    departmentRole: req.body.departmentRole,
  });
  try {
    const department = await newDepartment.save();
    console.log(req.params);
    // add to the follower list
    await clubModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { clubDepartments: department._id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );

    return res.status(201).json(department);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.AllDepartmentsInfo = async (req, res) => {
  try {
    const department = await departmentModel.find().select();
    res.send(department);
    // console.log("department", department);
  } catch (error) {
    console.log(error);
  }
};

// ..................................
//update department
module.exports.departmentUpdate = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);
  const updatedRecord = {
    departmentBoss: req.body.departmentBoss,
    departmentDescription: req.body.departmentDescription,
    departmentRole: req.body.departmentRole,
  };
  try {
    departmentModel.findByIdAndUpdate(
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
