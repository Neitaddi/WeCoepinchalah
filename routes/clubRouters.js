const router = require("express").Router();
const clubControllers = require("../Controllers/clubControllers");
const uploadController = require("../Controllers/uploadController");
const multer = require("multer");
const upload = multer();
router.post("/:id", clubControllers.createClub);
//get user info
router.get("/", clubControllers.AllClubsInfo);
router.get("/:id", clubControllers.clubInfo);
//upload file
router.post(
  "/upload/:id",
  upload.single("file"),
  uploadController.uploadProfilClub
);
module.exports = router;
