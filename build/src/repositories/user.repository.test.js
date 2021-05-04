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
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository = __importStar(require("./user.repository"));
const typeorm_1 = require("typeorm");
const utils_1 = require("ts-jest/utils");
const generate_1 = require("test/utils/generate");
jest.mock('typeorm');
const mockedGetRepo = utils_1.mocked(typeorm_1.getRepository({}));
beforeEach(() => {
    mockedGetRepo.find.mockClear();
    mockedGetRepo.findOne.mockClear();
    mockedGetRepo.save.mockClear();
});
describe("UserRepository", () => {
    describe("getUsers", () => {
        test('should return empty array', () => __awaiter(void 0, void 0, void 0, function* () {
            mockedGetRepo.find.mockResolvedValue([]);
            const users = yield UserRepository.getUsers();
            expect(users).toEqual([]);
            expect(mockedGetRepo.find).toHaveBeenCalledWith();
            expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
        }));
        test("should return user list", () => __awaiter(void 0, void 0, void 0, function* () {
            const usersData = generate_1.generateUsersData(2);
            mockedGetRepo.find.mockResolvedValue(usersData);
            const users = yield UserRepository.getUsers();
            expect(users).toEqual(usersData);
            expect(mockedGetRepo.find).toHaveBeenCalledWith();
            expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
        }));
    });
    describe("addUser", () => {
        test("should add user to the database", () => __awaiter(void 0, void 0, void 0, function* () {
            const payload = generate_1.generateUserPayload();
            const userData = generate_1.generateUserData(payload);
            mockedGetRepo.save.mockResolvedValue(userData);
            const user = yield UserRepository.createUser(payload);
            expect(user).toMatchObject(payload);
            expect(user).toEqual(userData);
            expect(mockedGetRepo.save).toHaveBeenCalledWith(payload);
            expect(mockedGetRepo.save).toHaveBeenCalledTimes(1);
        }));
    });
    describe("getUser", () => {
        test("should return user from the database", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 1;
            const userData = generate_1.generateUserData({ id });
            mockedGetRepo.findOne.mockResolvedValue(userData);
            const user = yield UserRepository.getUser(id);
            expect(user).toEqual(userData);
            expect(user === null || user === void 0 ? void 0 : user.id).toBe(id);
            expect(mockedGetRepo.findOne).toHaveBeenCalledWith({ id });
            expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1);
        }));
        test("should return null if user not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 1;
            mockedGetRepo.findOne.mockResolvedValue(null);
            const user = yield UserRepository.getUser(id);
            expect(user).toBeNull();
            expect(mockedGetRepo.findOne).toHaveBeenCalledWith({ id });
            expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1);
        }));
    });
});
