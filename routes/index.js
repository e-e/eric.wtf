const fs = require("fs");
const path = require("path");

const express = require("express");
const router = express.Router();

const config = require("../config");

router.get("/", (req, res) => {
	fs.readFile(path.join(config.viewspath, "./index.html"), "utf8", (err, html) => {
		if (err) {
			throw err;
			return;
		}
		res.send(html);
	});
});

module.exports = router;