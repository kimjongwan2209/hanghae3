const express = require("express");
const router = express.Router();
const { Post, member, like } = require("../models");
const authMiddleware = require("../middlewares/login_auth");

//로그인 한 유저가 좋아요한 게시글 조회 게시글
router.get("/like", authMiddleware, async (req, res) => {
  const user = res.locals.user;
  const post = await like.findAll({
    attributes: { exclude: ["id"] },
    include: [
      {
        model: Posts,
        attributes: ["title", "contents", "likeCount"],
        order: [["likeCount", "DESC"]],
      },
      {
        model: Users,
        attributes: ["nickname"],
      },
    ],
    where: { userId: user.id },
  });
  res.json({ posts });
});

// 게시글 작성
router.post("/", authMiddleware, async (req, res) => {
  const { title, contents } = req.body;
  const user = res.locals.user;

  if (title == "") {
    res.status(412).send({ erorrMessage: "제목을 입력하세요" });
    return;
  }
  if (contents == "") {
    res.status(412).send({ erorrMessage: "내용을 입력하세요" });
    return;
  }
  try {
    const post = await Post.create({
      title: title,
      contents: contents,
      userId: user.id,
    });
    return res.status(201).send({ message: "게시글 작성 완료" });
  } catch (error) {
    return res.status(500).send({ erorrMessage: "알수없는 오류 발생" });
  }
});

//게시글 수정
router.put("/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const user = res.locals.user;
  const { title, contents } = req.body;
  const updatePost = await Posts.findOne({ where: { id: postId } });

  if (!updatePost) {
    res.status(412).send({ erorrMessage: "존재하지 않는 게시글 입니다" });
    return;
  }
  if (title == "") {
    res.status(412).send({ erorrMessage: "제목을 입력하세요" });
    return;
  }
  if (contents == "") {
    res.status(412).send({ erorrMessage: "내용을 입력하세요" });
    return;
  }
  try {
    const updatePost = await Posts.update(
      { title, contents },
      { where: { id: postId } }
    );
    return res.status(200).send({ message: "수정 완료" });
  } catch (error) {
    return res.status(500).send({ erorrMessage: "알수없는 오류 발생" });
  }
});

//게시글 삭제
router.delete("/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const user = res.locals.user;
  const deletePost = await Posts.findOne({ where: { id: postId } });
  if (!deletePost) {
    res.status(404).send({ erorrMessage: "존재하지 않는 게시글 입니다" });
    return;
  }
  try {
    const deletePost = await Posts.destroy({ where: { id: postId } });
    res.status(200).send({ message: "게시글 삭제 완료" });
  } catch (error) {
    res.status(500).send({ erorrMessage: "알수없는 오류 발생" });
  }
});

//게시글 전체 조회 (로그인 필요 없음)
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.findAll({
      attributes: { exclude: ["password", "email", "contents"] },
    });

    res.status(200).send({ posts });
  } catch (error) {
    res.status(500).send({ erorrMessage: "알수없는 오류 발생" });
  }
});

//게시글 상세 조회 (로그인 필요 없음)
router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Posts.findOne({
      where: { id: postId },
      attributes: { exclude: ["password", "email"] },
    });
    res.status(200).send({ post });
  } catch (error) {
    res.status(500).send({ erorrMessage: "알수없는 오류 발생" });
  }
});

//로그인 한 유저만 게시글 좋아요 등록, 취소

router.put("/:postId/like", authMiddleware, async (req, res) => {
  const user = res.locals.user;
  const { postId } = req.params;
  const post = await Posts.findOne({ where: { id: postId } });

  if (!post) {
    res.status(404).send({ erorrMessage: "게시글이 존재하지 않습니다" });
    return;
  }

  try {
    // const postLike = await PostLikes.create({
    //   postId: postId,
    //   userId: user.id,
    // });
    let count = post.likeCount;
    if (!count) {
      const like = await like.create({
        postId: postId,
        userId: user.id,
      });
      await Posts.update(
        {
          likeCount: parseInt(count + 1),
        },
        { where: { id: postId } }
      );
      res.status(201).send({ message: "좋아요 완료" });
    } else if (count === 1) {
      await Posts.update(
        {
          likeCount: parseInt(count - 1),
        },
        { where: { id: postId } }
      );
      await PostLikes.destroy({
        where: { postId },
      });
      res.status(201).send({ message: "좋아요 취소" });
    }
  } catch (error) {
    res.status(500).send({ erorrMessage: "알수없는 오류 발생" });
  }
});

module.exports = router;