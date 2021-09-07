const router = require("express").Router();

const membreController = require("../Controllers/membreController");

router.get("/", membreController.AllMembresInfo);
router.post("/:id", membreController.createMembre);
router.put("/:id", membreController.membreUpdate);
router.delete("/:id", membreController.deleteMembre);
module.exports = router;
