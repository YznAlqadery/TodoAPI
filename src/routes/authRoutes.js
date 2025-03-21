import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import database from "../db.js";

// Create a router
const router = express.Router();

router.post("/register", (req, res) => {});

router.post("/login", (req, res) => {});

export default router;
