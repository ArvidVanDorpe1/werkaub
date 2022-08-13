const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    naam: { type: String, required: [true, "voeg een naam toe"] },
    email: {
      type: String,
      required: [true, "voeg een email toe"],
      unique: true,
    },
    paswoord: { type: String, required: [true, "voeg een paswoord toe"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
