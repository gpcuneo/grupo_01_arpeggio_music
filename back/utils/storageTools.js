const multer = require('multer');
const path = require('path');

const uploadFile = (dirFiles) => {
    const multerConfig = {
        destination:(req,file,cb)=>{
            cb(null, './public/images/' + dirFiles)
        },
        filename: (req,file,cb) =>{
            console.log(path.extname(file.originalname));  //es una manera de acceder a la extension
            cb (null, Date.now() + '-' + file.originalname);
        }
    }
    const storage = multer.diskStorage(multerConfig);
    return multer({storage})
}


const publicFiles = {
    'upload' : uploadFile
}

module.exports = publicFiles;