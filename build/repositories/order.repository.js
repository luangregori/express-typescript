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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.getOrderbyUser = exports.getOrderbyId = void 0;
const typeorm_1 = require("typeorm");
const models_1 = require("../models");
exports.getOrderbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Order);
    const order = yield repository.findOne(id);
    if (!order)
        return null;
    return order;
});
exports.getOrderbyUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Order);
    const orders = yield repository
        .createQueryBuilder("order")
        .leftJoinAndSelect("order.user", "user")
        .leftJoinAndSelect("order.market", "market")
        .leftJoinAndSelect("order.address", "address")
        .where(`user.id = ${userId}`)
        .getMany();
    return orders;
});
exports.createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Order);
    const order = new models_1.Order();
    return repository.save(Object.assign(Object.assign({}, order), payload));
});
