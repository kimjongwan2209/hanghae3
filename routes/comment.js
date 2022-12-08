const express = require("express");
const router = express.Router();
const { Posts, Users, Comments } = require("../models");
const authMiddleware = require("../middlewares/login_auth");

//댓글 생성 API
router.post("/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;
  const user = res.locals.user;

  if (comment === "") {
    res.status(412).send({ errorMessage: "댓글을 입력하세요" });
    return;
  }

  try {
    const posts = await Posts.findOne({ where: { id: postId } });
    if (!posts) {
      return res.status(404).send({ errorMessage: "게시글이 없습니다" });
    }
    const createComment = await Comments.create({
      comment: comment,
      userId: user.id,
      postId: postId,
    });
    return res.status(201).send({ message: "댓글 작성 완료" });
  } catch (error) {
    return res.status(500).send({ errorMessage: "알수없는 오류 발생" });
  }
});

//댓글 수정 API
router.put("/:commentId", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;
  const user = res.locals.user;

  if (!comment) {
    return res.status(404).send({ errorMessage: "댓글이 존재하지 않습니다" });
  }
  try {
    const updateComment = await Comments.update(
      { comment },
      { where: { id: commentId } }
    );
    return res.status(200).send({ message: "댓글수정 완료" });
  } catch (error) {
    return res.status(500).send({ errorMessage: "알수없는 오류 발생" });
  }
});

//댓글 삭제 API
router.delete("/:commentId", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const user = res.locals.user;
  const comments = await Comments.findOne({ where: { id: commentId } });
  if (!comments) {
    res.status(404).send({ erorrMessage: "존재하지 않는 게시글 입니다" });
    return;
  }
  try {
    const deleteComment = await Comments.destroy({ where: { id: commentId } });
    return res.status(200).send({ message: "댓글삭제 완료" });
  } catch (error) {
    console.log("error: ", error);

    return res.status(500).send({ errorMessage: "알수없는 오류 발생" });
  }
});

//댓글 전체 조회 (로그인 필요 없음)
router.get("/", async (req, res) => {
  try {
    const comments = await Comments.findAll({
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ comments });
  } catch (error) {
    console.log("error: ", error);

    return res.status(500).send({ errorMessage: "알수없는 오류 발생" });
  }
});
module.exports = router;