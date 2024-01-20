const express = require('express')
const path = require('path')
const app = express()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')
const port = 4000


PORT = process.env.PORT || port

const imageDB = []
app.use(express.static('public'))
app.use(express.static('uploads'))

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname) + '/index.html')
})
app.post('/image', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file.filename);
    console.log(req.body);

    // res.json({file:req.file,body:req.body})             //file ki jagah filename or any name pass kar sakte hai 
    fs.rename(`uploads/${req.file.filename}`, `uploads/${req.body.fullname}`,
        (err) => {
            if (err) { throw err }
            else {
                imageDB.push(req.body.fullname)
                res.send(`<image src='/${req.body.fullname}'></image>`);
                
            }
        })

})

app.get("/images", (req, res) => {

    let html = "";
    imageDB.forEach(image => {
        html += `<image width="30%" src='/${image}'></image>`
    })

    res.send(html);
})
app.listen(port, () => {
    console.log(`server started at port ${port}`);
})