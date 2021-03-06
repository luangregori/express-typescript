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
exports.deleteAddress = exports.createAddress = exports.getAddressbyUser = exports.getOnlyAddressbyId = void 0;
const typeorm_1 = require("typeorm");
const models_1 = require("../models");
exports.getOnlyAddressbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Address);
    return repository.findOneOrFail(id);
});
exports.getAddressbyUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Address);
    const address = yield repository
        .createQueryBuilder("address")
        .leftJoinAndSelect("address.user", "user")
        .where(`user.id = ${userId}`)
        .getMany();
    return address;
});
exports.createAddress = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Address);
    const address = new models_1.Address();
    return repository.save(Object.assign(Object.assign({}, address), payload));
});
exports.deleteAddress = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Address);
    return yield repository.delete(id);
});
