import express from 'express';
import { createRating, getRating } from '../controllers/rating.js';

const router = express.Router();

router.get('/:id', getRating)
router.post('/', createRating);

export default router