const express = require("express");
const router = express.Router();
const commentsRouter = require("./comment");
const postsRouter = require("./post");
const memberRouter = require("./members");

router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/auth", memberRouter);

module.exports = router;