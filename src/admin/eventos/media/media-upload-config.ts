import { diskStorage } from 'multer';
import { extname } from 'path';

export const mediaUploadConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, unique + extname(file.originalname));
    },
  }),

  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|mp4)$/)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes o videos'), false);
    }
  },
};