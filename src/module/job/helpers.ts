import multer from 'multer';
import path from 'path';

const storage: multer.StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
    // This will throw an error if this folder already does not exits
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix: string = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
        )}`;
        cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`,
        );
    },
});

const upload: multer.Multer = multer({ storage });

export default upload;
