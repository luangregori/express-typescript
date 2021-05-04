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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const tsoa_1 = require("tsoa");
const Yup = __importStar(require("yup"));
const user_repository_1 = require("../repositories/user.repository");
const session_repository_1 = require("../repositories/session.repository");
const httpHelper_1 = require("../helpers/httpHelper");
let UserController = class UserController {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_repository_1.getUsers();
        });
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().required().min(6),
            });
            if (!(yield schema.isValid(body))) {
                return httpHelper_1.badRequestError('Invalid argument');
            }
            const userExists = yield user_repository_1.getUserbyEmail(body.email);
            if (userExists) {
                return httpHelper_1.badRequestError('User already exists');
            }
            return user_repository_1.createUser(body);
        });
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Yup.object().shape({
                email: Yup.string().email().required(),
                password: Yup.string().required().min(6),
            });
            if (!(yield schema.isValid(body))) {
                return httpHelper_1.badRequestError('Invalid argument');
            }
            const userExists = yield user_repository_1.getUserbyEmail(body.email);
            if (!userExists) {
                return httpHelper_1.badRequestError('User not found');
            }
            const isValidPassword = yield user_repository_1.checkPassword(body.password, userExists.password_hash);
            if (!isValidPassword) {
                return httpHelper_1.badRequestError('Password does not match');
            }
            const { id, name, email } = userExists;
            return session_repository_1.getToken({ id, name, email });
        });
    }
};
__decorate([
    tsoa_1.Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    tsoa_1.Post("/"),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    tsoa_1.Post("/login"),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    tsoa_1.Route("users"),
    tsoa_1.Tags("User")
], UserController);
exports.default = UserController;
