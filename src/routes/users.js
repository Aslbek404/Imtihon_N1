import express from "express"
import controleruser from "../controllers/users.js";
const { Router } = express

const router = Router()

router.post("/api/projektRegister", controleruser.Register)
router.post("/api/projektLogin", controleruser.Login)
router.get("/api/UserGet",controleruser.User_Get)

export default router