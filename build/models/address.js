"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const typeorm_1 = require("typeorm");
const city_1 = require("./city");
const market_1 = require("./market");
const order_1 = require("./order");
const user_1 = require("./user");
let Address = class Address {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Address.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Address.prototype, "number", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Address.prototype, "district", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Address.prototype, "cep", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "complement", void 0);
__decorate([
    typeorm_1.ManyToOne(_type => city_1.City, (city) => city.adresses),
    __metadata("design:type", city_1.City)
], Address.prototype, "city", void 0);
__decorate([
    typeorm_1.OneToMany(_type => order_1.Order, (order) => order.address),
    __metadata("design:type", Array)
], Address.prototype, "orders", void 0);
__decorate([
    typeorm_1.OneToOne(() => market_1.Market, market => market.address),
    __metadata("design:type", market_1.Market)
], Address.prototype, "market", void 0);
__decorate([
    typeorm_1.OneToOne(() => user_1.User, user => user.address),
    __metadata("design:type", market_1.Market)
], Address.prototype, "user", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Address.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Address.prototype, "updated_at", void 0);
Address = __decorate([
    typeorm_1.Entity()
], Address);
exports.Address = Address;
