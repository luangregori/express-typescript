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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const product_1 = require("./product");
const market_1 = require("./market");
const address_1 = require("./address");
const user_1 = require("./user");
// STATUS
// created
// accepted
// delivery
// finished
let Order = class Order {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(({ type: "double precision" })),
    __metadata("design:type", Number)
], Order.prototype, "total_value", void 0);
__decorate([
    typeorm_1.ManyToMany(() => product_1.Product, product => product.orders),
    __metadata("design:type", Array)
], Order.prototype, "products", void 0);
__decorate([
    typeorm_1.ManyToOne(_type => market_1.Market, (market) => market.orders),
    __metadata("design:type", market_1.Market)
], Order.prototype, "market", void 0);
__decorate([
    typeorm_1.ManyToOne(_type => user_1.User, (user) => user.orders),
    __metadata("design:type", user_1.User)
], Order.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(_type => address_1.Address, (address) => address.orders),
    __metadata("design:type", address_1.Address)
], Order.prototype, "address", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Order.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Order.prototype, "updated_at", void 0);
Order = __decorate([
    typeorm_1.Entity()
], Order);
exports.Order = Order;
