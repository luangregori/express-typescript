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
const address_repository_1 = require("../repositories/address.repository");
const city_repository_1 = require("../repositories/city.repository");
const user_repository_1 = require("../repositories/user.repository");
const httpHelper_1 = require("../helpers/httpHelper");
let AddressController = class AddressController {
    getAddress(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const allAddress = yield address_repository_1.getAddressbyUser(user.id);
            let default_address = user.default_address ? user.default_address.id : 0;
            allAddress.map((el, idx) => {
                if (el.id === default_address) {
                    allAddress.splice(idx, 1);
                }
            });
            let merged = {
                default: user.default_address,
                all: allAddress
            };
            return merged;
        });
    }
    getAllCities() {
        return __awaiter(this, void 0, void 0, function* () {
            return city_repository_1.getAllCities();
        });
    }
    createAddress(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Yup.object().shape({
                street: Yup.string().required(),
                number: Yup.string().required(),
                district: Yup.string().required(),
                cep: Yup.string().required(),
                complement: Yup.string(),
                city_id: Yup.number()
            });
            if (!(yield schema.isValid(body))) {
                return httpHelper_1.badRequestError('Invalid argument');
            }
            const city = yield city_repository_1.getOnlyCitybyId(body.city_id);
            body.city = city;
            const address = yield address_repository_1.createAddress(body);
            if (body.default) {
                yield user_repository_1.updateAddress(body.user.id, address);
            }
            return address;
        });
    }
    deleteAddress(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (body.user.default_address.id === body.addressId) {
                yield user_repository_1.updateAddress(body.user.id);
            }
            return address_repository_1.deleteAddress(body.addressId);
        });
    }
};
__decorate([
    tsoa_1.Get("/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.User]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "getAddress", null);
__decorate([
    tsoa_1.Get("/cities"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "getAllCities", null);
__decorate([
    tsoa_1.Post("/"),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "createAddress", null);
__decorate([
    tsoa_1.Delete('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "deleteAddress", null);
AddressController = __decorate([
    tsoa_1.Route("address"),
    tsoa_1.Tags("Address")
], AddressController);
exports.default = AddressController;
