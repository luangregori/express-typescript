import express, { Request, Response } from "express";
import ProductController from "../controllers/product.controller";
// import authMiddleware from '../middlewares/auth';

const router = express.Router();
const productController = new ProductController();

// router.use(authMiddleware);

router.get("/:id", async (request: Request, response: Response) => {
  const res = await productController.getProduct(request.params.id);
  return response.send(res);
});

export default router