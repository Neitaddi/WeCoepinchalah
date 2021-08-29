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
router.patch("/upload/:id", uploadController.uploadProfilClub);
module.exports = router;
