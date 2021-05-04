import express, { Request, Response } from "express";
import CategoryController from "../controllers/category.controller";
import authMiddleware from '../middlewares/auth';


const router = express.Router();
const categoryController = new CategoryController();

router.use(authMiddleware);

router.get("/", async (_request: Request, response: Response) => {
  const res = await categoryController.getCategories();
  return response.send(res);
});

router.get("/:id", async (request: Request, response: Response) => {
  const res = await categoryController.getProductsInACategory(request.params.id);
  return response.send(res);
});

export default router