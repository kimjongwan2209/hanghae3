const db = require("../models");
const router  = require("express").Router();
const Member = db.Member;
const { member } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// 로그인
router.get("/login", async (req, res) => {    
    let id = req.query.id;
    let password = req.query.password;
    let password_check = req.query.password_check;

    try {
        const user = await Users.findOne({ where: { nickname: nickname } });
    
        if (!user || password !== user.password) {
          res
            .status(412)
            .send({ errorMessage: "닉네임 또는 비밀번호가 잘못되었습니다" });
          return;
        }
    
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);
        console.log("token:", token);
        return res.status(200).json({
          message: "로그인 완료",
          token: token,
        });
      } catch (error) {
        res.status(500).send({ errorMessage: "알수없는 오류 발생" });
      }
    });

//회원가입 
const nicknameReg = /^[A-Z,a-z, 0-9]{3,15}$/;
  if (!nicknameReg.test(nickname)) {
    res.status(412).send({
      errorMessage:
        "닉네임 형식 에러 (닉네임 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 생성)",
    });
    return;
  }
  // 중복된 닉네임 입력한 경우 에러
  const existingUser = await Users.findOne({ where: { nickname } });

  console.log(existingUser);
  if (existingUser !== null && existingUser.nickname === nickname) {
    res.status(412).send({
      errorMessage: "중복된 닉네임이 존재합니다",
    });
    return;
  }

  //비밀번호는 `최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패`로 만들기
  if (password.length < 4 || password.includes(nickname)) {
    res.status(412).send({
      errorMessage:
        "비밀번호 최소 4자 이상이여야 하며, 닉네임은 포함 불가합니다",
    });
    return;
  }
  // 비밀번호 확인과 비밀번호 값이 일치 하지 않을 경우
  if (confirmPassword !== password) {
    res.status(412).send({
      errorMessage: "입력한 비밀번호확인과 비밀번호가 일치하지 않습니다",
    });
    return;
  }

  try {
    const signup = await Users.create({
      nickname: nickname,
      email: email,
      password: password,
    });
    res.status(200).send({ messeage: "회원가입 성공!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      errorMessage: "알수 없는 에러 발생",
    });
  }
module.exports = router;