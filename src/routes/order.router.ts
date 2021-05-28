import express, { Request, Response } from "express";
import OrderController from "../controllers/order.controller";

const router = express.Router();
const orderController = new OrderController();

router.post("/", async (request: Request, response: Response) => {
  return orderController.createOrder(request.body)
    .then(res =>{
      response.send(res);
    })
    .catch(err =>{
      response.status(400).send(err);
    })
});

router.get("/", async (request: Request, response: Response) => {
  return orderController.getOrders(request.body.user.id)
    .then(res =>{
      response.send(res);
    })
    .catch(err =>{
      response.status(400).send(err);
    })
});

export default router