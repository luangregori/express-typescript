import express, { Request, Response } from "express";
import HomeController from "../controllers/home.controller";
// import authMiddleware from '../middlewares/auth';

const router = express.Router();
const homeController = new HomeController();

// router.use(authMiddleware);

router.get("/", async (request: Request, response: Response) => {
  const res = await homeController.getPromo();
  return response.send(res);
});

export default router