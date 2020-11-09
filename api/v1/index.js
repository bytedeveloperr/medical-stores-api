import express from "express";
import response from "../../app/utils/response.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.json(response("Welcome to Medical store API v1", null, 200));
});

export default router;
