import express, { Request, Response } from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();
const userController = new UserController();

router.get("/", async (_request: Request, response: Response) => {
  const res = await userController.getUsers();
  return response.send(res);
});

router.post("/", async (request: Request, response: Response) => {
  return userController.createUser(request.body)
    .then(res =>{
      response.send(res);
    })
    .catch(err =>{
      response.status(400).send(err);
    })
});

router.post("/login", async (request: Request, response: Response) => {
  return userController.login(request.body)
    .then(res =>{
      response.send(res);
    })
    .catch(err =>{
      response.status(400).send(err);
    })
});

// router.get("/:id", async (request: Request, response: Response) => {
//   const res = await userController.getUser(request.params.id);
//   if (!res) response.status(404).send({message: "No user found"})
//   return response.send(response);
// });

export default router