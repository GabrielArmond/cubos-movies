import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware';
import {
  registerUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  loginUser,
  getLoggedInUser,
} from '../controllers/userControler';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getLoggedInUser);
router.get('/', getAllUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

export default router;
