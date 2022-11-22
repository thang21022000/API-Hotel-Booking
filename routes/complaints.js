import express from 'express';
import { createComplaint } from '../controllers/complaint.js';

const router = express.Router();

router.post('/', createComplaint)

export default router