import multer from 'multer'
import path from 'path'

const imageMulter = multer({
    storage:multer.diskStorage({}),
    fileFilter: (req:any, file:any, cb:any)=>{
        let extn  = path.extname(file.originalname);

        if(extn!=='.jpg' && extn!=='.jpeg' && extn !== '.png'){
          return  cb(new Error('file type is not supported'), false)
        }
        cb(null, true)
    },
})

export default imageMulter

