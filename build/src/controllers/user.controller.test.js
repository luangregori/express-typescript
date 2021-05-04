"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const user_controller_1 = __importDefault(require("./user.controller"));
const UserRepository = __importStar(require("../repositories/user.repository"));
const generate_1 = require("test/utils/generate");
afterEach(() => {
    jest.resetAllMocks();
});
describe("UserController", () => {
    describe("getUsers", () => {
        test("should return empty array", () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(UserRepository, 'getUsers').mockResolvedValueOnce([]);
            const controller = new user_controller_1.default();
            const users = yield controller.getUsers();
            expect(users).toEqual([]);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        }));
        test("should return user list", () => __awaiter(void 0, void 0, void 0, function* () {
            const usersData = generate_1.generateUsersData(2);
            const spy = jest.spyOn(UserRepository, 'getUsers').mockResolvedValueOnce(usersData);
            const controller = new user_controller_1.default();
            const users = yield controller.getUsers();
            expect(users).toEqual(usersData);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        }));
    });
    describe("addUser", () => {
        test("should add user to the database", () => __awaiter(void 0, void 0, void 0, function* () {
            const payload = generate_1.generateUserPayload();
            const userData = generate_1.generateUserData(payload);
            const spy = jest.spyOn(UserRepository, 'createUser').mockResolvedValueOnce(userData);
            const controller = new user_controller_1.default();
            const user = yield controller.createUser(payload);
            expect(user).toMatchObject(payload);
            expect(user).toEqual(userData);
            expect(spy).toHaveBeenCalledWith(payload);
            expect(spy).toHaveBeenCalledTimes(1);
        }));
    });
    describe("getUser", () => {
        test("should return user from the database", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 1;
            const userData = generate_1.generateUserData({ id });
            const spy = jest.spyOn(UserRepository, 'getUser').mockResolvedValueOnce(userData);
            const controller = new user_controller_1.default();
            const user = yield controller.getUser(id.toString());
            expect(user).toEqual(userData);
            expect(user === null || user === void 0 ? void 0 : user.id).toBe(id);
            expect(spy).toHaveBeenCalledWith(id);
            expect(spy).toHaveBeenCalledTimes(1);
        }));
        test("should return null if user not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 1;
            const spy = jest.spyOn(UserRepository, 'getUser').mockResolvedValueOnce(null);
            const controller = new user_controller_1.default();
            const user = yield controller.getUser(id.toString());
            expect(user).toBeNull();
            expect(spy).toHaveBeenCalledWith(id);
            expect(spy).toHaveBeenCalledTimes(1);
        }));
    });
});
