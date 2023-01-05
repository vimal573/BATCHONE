import mongoose from "mongoose";
import app from "./app";
import Config from "./config";

(async () => {
  try {
    await mongoose.connect(Config.MONGODB_URL);
    console.log("DB connected");

    app.on("error", (err) => {
      console.log("ERROR ", err);
      throw err;
    });

    const onListening = () => {
      `Listening on ${Config.PORT}`;
    };

    app.listen(Config.PORT, onListening);
  } catch (err) {
    console.log("ERROR ", err);
    throw err;
  }
})();
