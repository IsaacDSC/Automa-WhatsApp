const fs = require('fs')
const multer = require('multer')
const path = require('path')
const folder = path.resolve(__dirname + '', '../', 'public', 'images')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(file)
        const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
        if (file.mimetype == isAccepted[0] || file.mimetype == isAccepted[1] || file.mimetype == isAccepted[2]) {
            cb(null, folder)
        } else {
            return cb(false)
        }
        //cb(null, folder)

    },
    filename: function(req, file, cb) {
        //function para contar arquivos
        fs.readdir(folder, (err, paths) => {
            //def nomes do arquivos
            cb(null, paths.length + 1 + '.png')
        })
    }
})
const upload = multer({
    storage,
    fileFilter: (req, res, cb) => {
        // console.log(mimeType)
        cb(null, true)

    }
})