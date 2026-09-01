import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads/PDF-contratos',
    filename: (req, file, callback) => {

      const uniqueSuffix =
        Date.now() + '-' + Math.round(Math.random() * 1e9);

      const ext = extname(file.originalname);

      callback(null, `contrato-${uniqueSuffix}${ext}`);
    }
  })
};