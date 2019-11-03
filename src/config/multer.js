import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    // Local aonde vai ser salvo a imagem
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // Arquivo a ser salvo
    filename: (req, file, callback) => {
      // crypto.randomBytes criar hash para nome da imagem
      crypto.randomBytes(16, (err, res) => {
        if (err) return callback(err);

        // Nome do arquivo vai ficar 3189h312hh.png
        return callback(null, res.toString('hex') + extname(file.originalname));
      });
    }
  })
};
