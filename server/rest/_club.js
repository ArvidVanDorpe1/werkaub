const express = require("express");
const { auth } = require("../middlewares/auth.js");

const {
  //getClubs,
  setClub,
  updateClub,
  deleteClub,
  getUserClubs,
  getClubs,
} = require("../service/club");
const router = express.Router();

router.get("/", auth, getUserClubs);
router.post("/", auth, setClub);
router.put("/:id", auth, updateClub);
router.delete("/:id", auth, deleteClub);

module.exports = router;
