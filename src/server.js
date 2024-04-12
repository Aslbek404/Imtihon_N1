import express from "express"
import RouterUser from "./routes/users.js"
import RouterFiles from "./routes/files.js"
import path from "path"
import cors from "cors"
import fileUpload from "express-fileupload"
const PORT = process.env.PORT || 8585

const app = express()


app.use(express.json())
app.use(fileUpload())
app.use(cors())
app.use(RouterUser)
app.use(RouterFiles)
app.use(express.static(path.join(process.cwd(), "src", "uploads")))


app.listen(PORT,() => console.log(`> Server is run localhost:${PORT} <`))