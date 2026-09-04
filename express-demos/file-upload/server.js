import express from "express"
import multer from "multer"

const app = express()

app.use(express.static('public'))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, done) {
        done(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post("/upload", upload.single("profilepic"), (req, res) => {
    if (!req.file) {
        res.send("No file uploaded")
    }
    res.send("File uploaded successfully")
})

app.listen(8000, () => {
    console.log('Server running on port 8000')
})