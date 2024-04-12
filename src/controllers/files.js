import fs from "fs"
import path from "path"
const Post_files = (req, res) => {
    const { userId } = req.params
    const { fileNomi } = req.body
    const { file } = req.files
    // console.log(file);
    let fileName = new Date().getTime() + "." + file.name
    let files = fs.readFileSync(path.join(process.cwd(), "src", "db", "files.json"), "utf-8")
    files = files.length != 0 ? JSON.parse(files) : []

    let newfiles = {
        id: files.length != 0 ? files[files.length - 1].id + 1 : 1,
        userId,
        fileName: fileNomi,
        mimetype: file.encoding,
        link: fileName,
        date: new Date().getDate() + "/" + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
        Time: new Date().getHours() + ':' + new Date().getMinutes()
    }
    // console.log(file);
    files.push(newfiles)

    fs.writeFileSync(path.join(process.cwd(), "src", "db", "files.json"), JSON.stringify(files, null, 4))
    file.mv(path.join(process.cwd(), "src", "uploads", fileName), (error) => {
        if (error) {
            return res.status(400).json({
                status: 400,
                message: "error"
            })
        } else {
            return res.status(201).json({
                status: 201,
                message: "files added succass",
                data: newfiles
            })
        }
    })
}
const FilesGet = (req, res) => {
    const {fileName} = req.query
    
    let files = fs.readFileSync(path.join(process.cwd(), "src", "db", "files.json"), "utf-8")
    files = files.length != 0 ? JSON.parse(files) : []

    let users = fs.readFileSync(path.join(process.cwd(), "src", "db", "users.json"), "utf-8")
    users = users.length != 0 ? JSON.parse(users) : []

    if(fileName){
        let file = files.filter(file => file.fileName == fileName)
        let fil = file.map(fil => {
            fil.user = users.find(user => user.userId == +fil.userId)
            fil.viewLink = "http://localhost:8585/" + fil.link
            fil.downloadLink = fil.link
            delete fil.user.password
            return fil
        })
        return res.status(200).json({
            status: 200,
            message: "All files succass",
            data:fil
        })
    }
    
        let fil = files.map(fil => {
            fil.user = users.find(user => user.userId == +fil.userId)
            fil.viewLink = "http://localhost:8585/" + fil.link
            fil.downloadLink = fil.link
            delete fil.user.password
            return fil
        })
    
    res.status(200).json({
        status: 200,
        message: "All files succass",
        data:fil
    })
}
const AdminFile_GET = (req, res) => {
    let { userId } = req.params
    let files = fs.readFileSync(path.join(process.cwd(), "src", "db", "files.json"), "utf-8")
    files = files.length != 0 ? JSON.parse(files) : []

    let AdminFile = files.filter(AdminFile => AdminFile.userId == userId)
    let AdminFil = files.map(AdminFil => {
        AdminFil.viewLink = "http://localhost:8585/" + AdminFil.link
        AdminFil.downloadLink = AdminFil.link
        return AdminFil
    })
    return res.status(200).json({
        status: 200,
        message: " Admin file get sucassfluy",
        dataFile: AdminFile
    })

}
// const SrcFile_Get = (req, res) => {
//     const { fileName } = req.body

//     let files = fs.readFileSync(path.join(process.cwd(), "src", "db", "files.json"), "utf-8")
//     files = files.length != 0 ? JSON.parse(files) : []

//     let Srcfiles = files.filter(Srcfiles => Srcfiles.fileName == fileName)

//     if(Srcfiles){
//         return res.status(200).json({
//             status: 200,
//             message: "Malumotni sucassfluy",
//             data: Srcfiles
//         })
//     }else {
//         return res.status(404).json({
//             status: 404,
//             message: "Malumotni  undifind",
//         })
//     }

// }
const download = (req, res) => {
    const { fileName } = req.params
    res.download(path.join(process.cwd(), "src", "uploads", fileName))
}
const Delete = (req, res) => {
    const { fileId, userId } = req.query
    let files = fs.readFileSync(path.join(process.cwd(), "src", "db", "files.json"), "utf-8")
    files = files.length != 0 ? JSON.parse(files) : []

    let file = files.find(file => file.id == fileId)

    if (file.userId != userId) {
        return res.status(400).json({
            status: 400,
            message: "> Senga o'chirish mumkin emas <",
        })
    }

    file = files.filter(file => file.id != fileId)
    fs.writeFileSync(path.join(process.cwd(), "src", "db", "files.json"), JSON.stringify(file, null, 4))

    return res.status(200).json({
        status: 200,
        message: "Deleted success",
    })
}
const Adminfile_Put = (req, res) => {
    const { fileId } = req.params
    const { fileName } = req.body
    let files = fs.readFileSync(path.join(process.cwd(), "src", "db", "files.json"), "utf-8")
    files = files.length != 0 ? JSON.parse(files) : []

    let file = files.find(file => file.id == fileId)
    file.fileName = fileName

    console.log(file.fileName);
    fs.writeFileSync(path.join(process.cwd(), "src", "db", "files.json"), JSON.stringify(files, null, 4))

    return res.status(201).json({
        status: 201,
        message: "Updet success",
    })
}
export default {
    Post_files,
    FilesGet,
    download,
    AdminFile_GET,
    Delete,
    Adminfile_Put

    // SrcFile_Get
}