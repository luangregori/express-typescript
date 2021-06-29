import express, { Request, Response } from "express";
import MarketController from "../controllers/market.controller";
// import authMiddleware from '../middlewares/auth';

const router = express.Router();
const marketController = new MarketController();

// router.use(authMiddleware);

router.get("/", async (request: Request, response: Response) => {
  const res = await marketController.getMarkets();
  return response.send(res);
});

router.get("/:id", async (request: Request, response: Response) => {
  const res = await marketController.getProductsInAMarket(request.params.id);
  return response.send(res);
});


export default router