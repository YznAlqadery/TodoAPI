import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import database from "../db.js";

// Create a router
const router = express.Router();

// Register a new user (POST /auth/register) endpoint
router.post("/register", (req, res) => {
  // Get the user data from the request body
  const { username, password } = req.body;

  // Encrypt the password
  const hashedPassword = bcrypt.hashSync(password, 8);
  // Save the new user and the hashed password to the database
  try {
    // The prepare method is used to prepare a SQL statement for execution and add values to be bound to the statement.
    const insertUser = database.prepare(
      `INSERT INTO users (username, password) VALUES (?, ?)`
    );
    // We passed the username and hashedPassword as values to be bound to the statement.
    const result = insertUser.run(username, hashedPassword);

    // Add their first Todo for them
    const defaultTodo = "Hello and Welcome, Add ypur first Todo!";
    const insertTodo = database.prepare(
      `INSERT INTO todos (user_id, task) VALUES (?,?)`
    );
    // The lastInsertRowid property is used to retrieve the ID of the last inserted row in a table.
    insertTodo.run(result.lastInsertRowid, defaultTodo);

    // Generate a JWT token for the new user
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    // Return the token to the client
    res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(503).json({ message: "Internal Server Error" });
  }
});

router.post("/login", (req, res) => {});

export default router;
