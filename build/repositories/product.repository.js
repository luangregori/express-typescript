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
exports.getProductsInACategory = exports.getOnlyProductbyId = exports.getProduct = void 0;
const typeorm_1 = require("typeorm");
const models_1 = require("../models");
exports.getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Product);
    return repository
        .createQueryBuilder("product")
        .leftJoinAndSelect("product.markets", "market")
        .where(`product.id = ${id}`)
        .getRawOne();
});
exports.getOnlyProductbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Product);
    return repository.findOneOrFail(id);
});
exports.getProductsInACategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Product);
    return repository
        .createQueryBuilder("product")
        .innerJoin("product.category", "category")
        .where(`category.id = ${id}`)
        .getMany();
});
