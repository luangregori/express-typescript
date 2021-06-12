import express, { Request, Response } from "express";
import AddressController from "../controllers/address.controller";

const router = express.Router();
const addressController = new AddressController();

router.get("/cities", async (request: Request, response: Response) => {
  return addressController.getAllCities()
    .then(res =>{
      response.send(res);
    })
    .catch(err =>{
      response.status(400).send(err);
    })
})

router.post("/", async (request: Request, response: Response) => {
  return addressController.createAddress(request.body)
    .then(res =>{
      response.send(res);
    })
    .catch(err =>{
      response.status(400).send(err);
    })
});

router.get("/", async (request: Request, response: Response) => {
  return addressController.getAddress(request.body.user)
    .then(res =>{
      response.send(res);
    })
    .catch(err =>{
      response.status(400).send(err);
    })
});

router.delete("/", async (request: Request, response: Response) => {
  return addressController.deleteAddress(request.body)
    .then(res =>{
      response.status(204).send({'success': true});
    })
    .catch(err =>{
      response.status(400).send(err);
    })
});

export default router