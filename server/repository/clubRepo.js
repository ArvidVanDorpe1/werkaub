const mongoose = require("mongoose");

const clubSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    naam: {
      type: String,
      required: [true, "geef een naam mee a.u.b."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Club", clubSchema);
