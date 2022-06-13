import multer from "multer";

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'pictures')
    },
    filename:(req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
        || file.mimetype === 'image/jpeg'){
            cb(null, true);
        }else {
            cb(null, false);
        }
}

const upload = multer({ storage: storage , fileFilter: fileFilter });
const uploadPlant = upload.single('picture');
export { uploadPlant }
