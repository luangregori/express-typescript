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
exports.checkPassword = exports.getPasswordHash = exports.getUserbyEmail = exports.getUserbyId = exports.createUser = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const typeorm_1 = require("typeorm");
const models_1 = require("../models");
exports.getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_1.getRepository(models_1.User);
    return userRepository.find();
});
exports.createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_1.getRepository(models_1.User);
    const user = new models_1.User();
    payload.password_hash = yield exports.getPasswordHash(payload.password);
    return userRepository.save(Object.assign(Object.assign({}, user), payload));
});
exports.getUserbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_1.getRepository(models_1.User);
    const user = yield userRepository
        .createQueryBuilder("user")
        // .leftJoinAndSelect("user.default_address", "address") 
        // .leftJoinAndSelect("user.default_card", "card") 
        .where(`user.id = ${id}`)
        .getOne();
    // const user = await userRepository.findOne(id)
    if (!user)
        return null;
    return user;
});
exports.getUserbyEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_1.getRepository(models_1.User);
    const user = yield userRepository.findOne({ email });
    if (!user)
        return null;
    return user;
});
exports.getPasswordHash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.hash(password, 8);
});
exports.checkPassword = (password, id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_1.getRepository(models_1.User);
    const user = yield userRepository
        .createQueryBuilder('user')
        .addSelect("user.password_hash")
        .where(`user.id = ${id}`)
        .getRawOne();
    return yield bcryptjs_1.default.compare(password, user.password_hash);
});
// export const updateAddress = async(userId: number, address?: Address): Promise<void> => {
//   const repository = getRepository(User);
//   await repository
//     .createQueryBuilder()
//     .update(User)
//     .set({ default_address : address})
//     .where(`id = ${userId}`)
//     .execute();
// }
// export const updateCard = async(userId: number, card?: Card): Promise<void> => {
//   const repository = getRepository(User);
//   await repository
//     .createQueryBuilder()
//     .update(User)
//     .set({ default_card : card})
//     .where(`id = ${userId}`)
//     .execute();
// }
