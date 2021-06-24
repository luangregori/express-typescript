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
const models_1 = require("../models");
const card_repository_1 = require("../repositories/card.repository");
// import { updateCard } from "../repositories/user.repository";
const httpHelper_1 = require("../helpers/httpHelper");
let CardController = class CardController {
    getCards(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const allCards = yield card_repository_1.getCardbyUser(user.id);
            // let default_card = user.default_card ? user.default_card.id : 0;
            // allCards.map((el, idx) => {
            //   if(el.id === default_card){
            //     allCards.splice(idx, 1);
            //   }
            // })
            // let merged = {
            //   default: user.default_card,
            //   all: allCards
            // }
            return allCards;
        });
    }
    createCard(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Yup.object().shape({
                number: Yup.string().required(),
                name: Yup.string().required(),
                due_date: Yup.string().required(),
                cvv: Yup.string().required().min(3).max(3),
                cpf: Yup.string().required(),
            });
            if (!(yield schema.isValid(body))) {
                return httpHelper_1.badRequestError('Invalid argument');
            }
            const card = yield card_repository_1.createCard(body);
            // if(body.default){
            //   await updateCard(body.user.id, card)
            // }
            return card;
        });
    }
    deleteCard(body) {
        return __awaiter(this, void 0, void 0, function* () {
            // if(body.user.default_card.id === body.cardId){
            //   await updateCard(body.user.id)
            // }
            return card_repository_1.deleteCard(body.cardId);
        });
    }
};
__decorate([
    tsoa_1.Get("/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.User]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "getCards", null);
__decorate([
    tsoa_1.Post("/"),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "createCard", null);
__decorate([
    tsoa_1.Delete('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "deleteCard", null);
CardController = __decorate([
    tsoa_1.Route("card"),
    tsoa_1.Tags("Card")
], CardController);
exports.default = CardController;
