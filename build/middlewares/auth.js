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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("util");
const auth_1 = __importDefault(require("../config/auth"));
const user_repository_1 = require("../repositories/user.repository");
exports.default = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = request.headers.authorization || '';
    if (!authHeader) {
        response.status(401).json({ error: 'Token not provided' });
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = yield util_1.promisify(jsonwebtoken_1.default.verify)(token, auth_1.default.secret);
        const user = yield user_repository_1.getUserbyId(decoded.id);
        request.body.user = user;
        return next();
    }
    catch (error) {
        response.status(401).json({ error: 'Token invalid' });
    }
    return next();
});
