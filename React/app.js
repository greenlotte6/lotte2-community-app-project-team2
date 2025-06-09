import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // ✅ 환경변수 로드
const app = express();
app.use(cors());

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("connected to database")) 
.catch(err => console.error("DB connection error:", err)); // (선택) 에러 캐치 추가

export default app; // ✅ ES Module 방식
