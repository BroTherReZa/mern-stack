const multer = require('multer')
const uuid = require('uuid/v1')

const type = {
   'image/png' : 'png',
   'image/jpg' : 'jpg',
   'image/jpeg': 'jpeg'
}

const fileUpload =  multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null,'uploads/images', )
        },
        filename: (req, file, cb)=>{
            const ext = type[file.mimetype]
            cb(null, uuid() + '.' + ext )
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!type[file.mimetype]
        let error = isValid ? null : new Error('invalid Type.')
        cb(error,isValid)
    }
})


module.exports = fileUpload 