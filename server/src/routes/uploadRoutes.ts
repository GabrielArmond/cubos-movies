import { Router } from 'express';
import { uploadImage, deleteImage } from '../controllers/uploadController';
import { uploadSingle } from '../middlewares/uploadMiddleware';

const router = Router();

router.post('/image', uploadSingle('file'), uploadImage);
router.delete('/:fileName', deleteImage);

export default router;
