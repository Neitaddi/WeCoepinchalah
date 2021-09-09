const router = require("express").Router();

const tacheController = require("../Controllers/tacheController");

router.get("/", tacheController.AllTachesInfo);
router.post("/:id", tacheController.createTache);
router.put("/:id", tacheController.tacheUpdate);
router.delete("/:id", tacheController.deleteTache);
module.exports = router;
