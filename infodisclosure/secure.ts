import express, { Request, Response } from "express";
import mongoose, { Schema, Document, Model } from "mongoose";

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/infodisclosure")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define an interface for the User document
interface IUser extends Document {
  username: string;
  password: string;
}

// Define a Mongoose schema
const userSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Create a Mongoose model based on the schema
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

// Route to authenticate user (SECURE AGAINST NOSQL INJECTION)
app.get("/userinfo", async (req: Request, res: Response) => {
  // Extract username from query parameters
  // shorthand for const username = req.query.username;
  const { username } = req.query;

  // Input validation: Ensure username is a string
  if (typeof username !== "string") {
    return res.status(400).send("Invalid username format");
  }

  // Perform database query using sanitized username
  try {
    // Sanitize username input: Prevent NoSQL injection
    const sanitizedUsername = username.replace(/[^\w\s]/gi, ""); // Remove non-alphanumeric characters
    const user = await User.findOne({ username: sanitizedUsername }).exec();

    if (user) {
      res.send(`User: ${user}`);
    } else {
      res.status(401).send("Invalid username");
    }
  } catch (error) {
    console.error("Error querying database:", error);
    res.status(500).send("Internal server error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
