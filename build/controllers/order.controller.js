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
const product_repository_1 = require("../repositories/product.repository");
const market_repository_1 = require("../repositories/market.repository");
const address_repository_1 = require("../repositories/address.repository");
const order_repository_1 = require("../repositories/order.repository");
const httpHelper_1 = require("../helpers/httpHelper");
let OrderController = class OrderController {
    getOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return order_repository_1.getOrderbyUser(id);
        });
    }
    createOrder(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Yup.object().shape({
                productsIds: Yup.array().required(),
                marketId: Yup.number().required(),
                addressId: Yup.number().required()
            });
            if (!(yield schema.isValid(body))) {
                return httpHelper_1.badRequestError('Invalid argument');
            }
            const market = yield market_repository_1.getOnlyMarketbyId(body.marketId);
            const address = yield address_repository_1.getOnlyAddressbyId(body.addressId);
            let total_value = 0;
            const products = yield Promise.all(body.productsIds.map((el) => __awaiter(this, void 0, void 0, function* () {
                const product = yield product_repository_1.getOnlyProductbyId(el);
                total_value += product.price;
                return product;
            })));
            const newOrder = {
                products,
                total_value,
                market,
                address,
                user: body.user,
                status: 'created'
            };
            const order = yield order_repository_1.createOrder(newOrder);
            return order;
        });
    }
};
__decorate([
    tsoa_1.Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrders", null);
__decorate([
    tsoa_1.Post("/"),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
OrderController = __decorate([
    tsoa_1.Route("users"),
    tsoa_1.Tags("User")
], OrderController);
exports.default = OrderController;
