import express, { Request, Response } from "express";
import ProductController from "../controllers/product.controller";
// import authMiddleware from '../middlewares/auth';

const router = express.Router();
const productController = new ProductController();

// router.use(authMiddleware);

router.get("/:id", async (request: Request, response: Response) => {
  return productController.getProduct(request.params.id)
    .then(res =>{
      response.send(res);
    })
    .catch(err =>{
      response.status(400).send(err);
    })
});

router.post("/filter", async (request: Request, response: Response) => {
  return productController.filterProducts(request.body)
    .then(res =>{
      response.send(res);
    })
    .catch(err =>{
      response.status(400).send(err);
    })
});

export default router