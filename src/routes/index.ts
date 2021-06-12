import express from "express";
import UserRouter from "./user.router";
import CategoryRouter from "./category.router";
import ProductRouter from "./product.router";
import HomeRouter from "./home.router";
import OrderRouter from "./order.router";
import AddressRouter from "./address.router";
import CardRouter from "./card.router";

import authMiddleware from '../middlewares/auth';

const router = express.Router();

router.get('/healthcheck', (req, res) => {
  return res.status(200).json({ status: 'UP' });
});

router.use("/users", UserRouter)

router.use(authMiddleware);

router.use("/category", CategoryRouter)
router.use("/product", ProductRouter)
router.use("/home", HomeRouter)
router.use("/order", OrderRouter)
router.use("/order", OrderRouter)
router.use("/address", AddressRouter)
router.use("/card", CardRouter)

export default router;
