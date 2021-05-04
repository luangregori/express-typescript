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
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = express_1.default.Router();
const userController = new user_controller_1.default();
router.get("/", (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield userController.getUsers();
    return response.send(res);
}));
router.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return userController.createUser(request.body)
        .then(res => {
        response.send(res);
    })
        .catch(err => {
        response.status(400).send(err);
    });
}));
router.post("/login", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return userController.login(request.body)
        .then(res => {
        response.send(res);
    })
        .catch(err => {
        response.status(400).send(err);
    });
}));
// router.get("/:id", async (request: Request, response: Response) => {
//   const res = await userController.getUser(request.params.id);
//   if (!res) response.status(404).send({message: "No user found"})
//   return response.send(response);
// });
exports.default = router;
