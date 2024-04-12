import fs from "fs"
import path from "path"
import sha256 from "sha256"
import JWT from "jsonwebtoken"
const Register = (req, res) => {
    let { userName, password } = req.body
    password = sha256(password)
    const { img } = req.files

    let fileName = new Date().getTime() + "." + img.name

    let users = fs.readFileSync(path.join(process.cwd(), "src", "db", "users.json"), "utf-8")
    users = users.length != 0 ? JSON.parse(users) : []

    let newUser = {
        userId: users.length != 0 ? users[users.length - 1].userId + 1 : 1,
        userName,
        password,
        img: fileName
    }
    users.push(newUser)

    fs.writeFileSync(path.join(process.cwd(), "src", "db", "users.json"), JSON.stringify(users, null, 4))
    img.mv(path.join(process.cwd(), "src", "uploads", fileName), (error) => {
        if (error) {
            return res.status(400).json({
                status: 400,
                message: error
            })
        } else {
            return res.status(201).json({
                status: 201,
                message: "User added succass",
                data: newUser,
                token: JWT.sign({ id: newUser.userId }, "Shaftoli")
            })
        }
    })

}
const Login = (req, res) => {
    let { userName, password } = req.body
    password = sha256(password)
    let users = fs.readFileSync(path.join(process.cwd(), "src", "db", "users.json"), "utf-8")
    users = users.length != 0 ? JSON.parse(users) : []

    const user = users.find(user => user.userName == userName && user.password == password)
    if (user) {
        return res.status(200).json({
            status: 200,
            message: "User ro'yhatan o'tgan ekan",
            data: user,
            token: JWT.sign({ id: user.userId }, "shaftoli")
        })
    }
    return res.status(404).json({
        status: 404,
        message: "User ro'yhatan topilmadi"
    })
}
const User_Get = (req, res) => {
    let users = fs.readFileSync(path.join(process.cwd(), "src", "db", "users.json"), "utf-8")
    users = users.length != 0 ? JSON.parse(users) : []

    return res.status(200).json({
        status: 200,
        message: "User get sucassfluy",
        data: users
    })
}
export default {
    Register,
    Login,
    User_Get
}
