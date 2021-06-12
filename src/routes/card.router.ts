import express, { Request, Response } from "express";
import CardController from "../controllers/card.controller";

const router = express.Router();
const cardController = new CardController();

router.post("/", async (request: Request, response: Response) => {
  return cardController.createCard(request.body)
    .then(res =>{
      response.send(res);
    })
    .catch(err =>{
      response.status(400).send(err);
    })
});

router.get("/", async (request: Request, response: Response) => {
  return cardController.getCards(request.body.user)
    .then(res =>{
      response.send(res);
    })
    .catch(err =>{
      response.status(400).send(err);
    })
});

router.delete("/", async (request: Request, response: Response) => {
  return cardController.deleteCard(request.body)
    .then(res =>{
      response.status(204).send({'success': true});
    })
    .catch(err =>{
      response.status(400).send(err);
    })
});

export default router