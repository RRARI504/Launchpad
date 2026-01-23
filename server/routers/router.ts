import express from 'express';

import { prisma } from '../database/prisma.js';

import dashboardRouter from './dashboard.js';
import userRouter from './user.js'

const router = express.Router();

router.use('/user', userRouter);
router.use('/dashboard', dashboardRouter);

export default router;
