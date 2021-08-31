//require router by express
const router = require("express").Router();
const multer = require("multer");
const upload = multer();
//require authAontroller
const authController = require("../Controllers/authController.js");
const userController = require("../Controllers/userController.js");
const uploadController = require("../Controllers/uploadController");

//post router //user register // with authAontroller
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user router
//get all user
router.get("/", userController.getAllUsers);
//get user info
router.get("/:id", userController.userInfo);
//update user
router.put("/:id", userController.userUpdate);
//delete user
router.delete("/:id", userController.userDelete);
//user follow
router.patch("/follow/:id", userController.follow);
//user unfollow
router.patch("/unfollow/:id", userController.unfollow);

//upload file
// router.post("/upload", upload.single("file"), uploadController.uploadProfil);
router.patch("/upload/:id", uploadController.uploadProfil);

module.exports = router;
