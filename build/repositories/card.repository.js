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
exports.deleteCard = exports.createCard = exports.getCardbyUser = exports.getOnlyACardbyId = void 0;
const typeorm_1 = require("typeorm");
const models_1 = require("../models");
exports.getOnlyACardbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Card);
    return repository.findOneOrFail(id);
});
exports.getCardbyUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Card);
    const cards = yield repository
        .createQueryBuilder("card")
        .leftJoinAndSelect("card.user", "user")
        .where(`user.id = ${userId}`)
        .getMany();
    return cards;
});
exports.createCard = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Card);
    const card = new models_1.Card();
    return repository.save(Object.assign(Object.assign({}, card), payload));
});
exports.deleteCard = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Card);
    return yield repository.delete(id);
});
