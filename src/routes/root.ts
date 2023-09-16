import { Router } from "express";
const router = Router();

import postsRouter from "./posts";
import albumsRouter from "./albumns";
import commentsRouter from "./comments";
import photosRouter from "./photos";
import todosRouter from "./todos";
import usersRouter from "./users";
import checkoutRouter from "./checkout";
import webhookRouter from "./webhook/stripe";
import usageRouter from "./usage";

router.use('/', postsRouter);
router.use('/', albumsRouter);
router.use('/', commentsRouter);
router.use('/', photosRouter);
router.use('/', todosRouter);
router.use('/', usersRouter);
router.use('/billing', checkoutRouter);
router.use('/billing', webhookRouter);
router.use('/billing', usageRouter);

export default router;