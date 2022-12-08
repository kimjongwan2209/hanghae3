const express = require("express");
const indexRouter = require("./routes/index");
const app = express();
const port = 3010;
const { sequelize } = require("./models");
const cookieParser = require("cookie-parser");

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/api", indexRouter);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});