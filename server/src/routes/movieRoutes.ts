import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware';
import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  updateMovie,
} from '../controllers/movieController';

const router = Router();

router.get('/', protect, getMovies);
router.get('/:id', protect, getMovieById);
router.post('/', protect, createMovie);
router.put('/:id', protect, updateMovie);
router.delete('/:id', protect, deleteMovie);

export default router;
