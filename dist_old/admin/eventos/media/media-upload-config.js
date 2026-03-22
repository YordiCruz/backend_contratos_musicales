"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaUploadConfig = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
exports.mediaUploadConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads',
        filename: (req, file, cb) => {
            const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, unique + (0, path_1.extname)(file.originalname));
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif|mp4)$/)) {
            cb(null, true);
        }
        else {
            cb(new Error('Solo se permiten imágenes o videos'), false);
        }
    },
};
//# sourceMappingURL=media-upload-config.js.map