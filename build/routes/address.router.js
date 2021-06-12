"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const address_controller_1 = __importDefault(require("../controllers/address.controller"));
const router = express_1.default.Router();
const addressController = new address_controller_1.default();
router.get("/cities", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return addressController.getAllCities()
        .then(res => {
        response.send(res);
    })
        .catch(err => {
        response.status(400).send(err);
    });
}));
router.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return addressController.createAddress(request.body)
        .then(res => {
        response.send(res);
    })
        .catch(err => {
        response.status(400).send(err);
    });
}));
router.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return addressController.getAddress(request.body.user)
        .then(res => {
        response.send(res);
    })
        .catch(err => {
        response.status(400).send(err);
    });
}));
router.delete("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return addressController.deleteAddress(request.body)
        .then(res => {
        response.status(204).send({ 'success': true });
    })
        .catch(err => {
        response.status(400).send(err);
    });
}));
exports.default = router;
