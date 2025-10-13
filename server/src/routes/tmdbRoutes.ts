import { Router } from 'express';
import {
  getMovieDetails,
  getMovieGenres,
  getPopularMovies,
  searchMovies,
} from '../controllers/tmdbController';

const router = Router();

router.get('/popular', getPopularMovies);
router.get('/search', searchMovies);
router.get('/genres', getMovieGenres);
router.get('/:id', getMovieDetails);

export default router;
