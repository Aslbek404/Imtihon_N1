import express from "express"
import controllerfiles from "../controllers/files.js";
const { Router } = express

const router = Router()

router.post("/api/PostFiles/:userId", controllerfiles.Post_files)
router.get("/api/FileGET", controllerfiles.FilesGet)
router.get("/api/AdminFile_GET/:userId",controllerfiles.AdminFile_GET)
// router.get("/api/srcfileget",controllerfiles.SrcFile_Get)
router.get("/api/FileDawnload/:fileName", controllerfiles.download)
router.delete("/api/file", controllerfiles.Delete)
router.put("/api/Admin_put/:fileId",controllerfiles.Adminfile_Put)

export default router