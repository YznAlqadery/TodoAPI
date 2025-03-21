import express from "express";
import database from "../db.js";

const router = express.Router();

// Get all Todos for logged-in user
router.get("/", (req, res) => {});

// Create a new Todo
router.post("/", (req, res) => {});

// Update a Todo
router.put("/:id", (req, res) => {});

// Delete a Todo
router.delete("/:id", (req, res) => {});

export default router;
