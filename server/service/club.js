//namen verkeer club zou moeten event zijn !!!!! NOG AANPASSEN!!!!

const asyncHandler = require("express-async-handler");
const { globalAgent } = require("http");

const Club = require("../repository/clubRepo.js");
const User = require("../repository/userRepo.js");

//Get alle events van iedereen
const getClubs = asyncHandler(async (req, res) => {
  const clubs = await Club.find();
  res.status(200).json(clubs);
});

//Get alle events van de user
const getUserClubs = asyncHandler(async (req, res) => {
  const clubs = await Club.find({ user: req.user.id });
  res.status(200).json(clubs);
});

//Maak een evenement aan
const setClub = asyncHandler(async (req, res) => {
  console.log("create aangeroepen");
  if (!req.body.naam) {
    res.status(400);
    throw new Error("naam invullen aub");
  }

  const club = await Club.create({
    naam: req.body.naam,
    user: req.user.id,
  });

  res.status(200).json(club);
});

//Pas een evenement aan
const updateClub = asyncHandler(async (req, res) => {
  const club = await Club.findById(req.params.id);

  if (!club) {
    res.status(400);
    throw new Error("Club niet gevonden!");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User niet gevonden");
  }

  //juiste user matcht de event user
  if (clubs.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User niet geauthorizeerd");
  }

  const updatedClub = await Club.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedClub);
});

//Delete een evenement
const deleteClub = asyncHandler(async (req, res) => {
  const club = await Club.findById(req.params.id);

  if (!club) {
    res.status(400);
    throw new Error("Club niet gevonden!");
  }
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User niet gevonden");
  }

  //juiste user matcht de event user
  if (club.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User niet geauthorizeerd");
  }

  await club.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getClubs,
  setClub,
  updateClub,
  deleteClub,
  getUserClubs,
};
