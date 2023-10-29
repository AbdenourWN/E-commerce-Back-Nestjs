import * as multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export const imageFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image') &&
    ['jpg', 'jpeg', 'png', 'webp', 'avif'].includes(
      file.originalname.split('.')[1].toLowerCase(),
    )
  ) {
    cb(null, true);
  } else {
    cb(new Error('Please upload only images.'), false);
  }
};

export const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, cb) => {
    const filename: string = uuidv4();
    const extension: string = file.originalname.split('.')[1];
    cb(null, `${filename}.${extension}`);
  },
});
