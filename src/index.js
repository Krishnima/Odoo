import { app } from "./app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import { runAllCollectionCreation } from "./models/index.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3002;

connectDB()
  .then(async () => {
    await runAllCollectionCreation();
    app.listen(port, () => console.log(`Server is running at port: ${port}`));
  })
  .catch((error) =>
    console.error(`Error connecting server :: ERROR :: `, error)
  );
