const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(conn);
    console.log(`MONGODB geconnecteerd: ${conn.connection.host}`.cyan);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectToMongo;
