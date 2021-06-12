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
exports.Market = void 0;
const typeorm_1 = require("typeorm");
const product_1 = require("./product");
const order_1 = require("./order");
const address_1 = require("./address");
let Market = class Market {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Market.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Market.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Market.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Market.prototype, "url_photo", void 0);
__decorate([
    typeorm_1.OneToMany(() => product_1.ProductMarket, (productMarket) => productMarket.market),
    __metadata("design:type", Array)
], Market.prototype, "productMarket", void 0);
__decorate([
    typeorm_1.OneToMany(_type => order_1.Order, (order) => order.market),
    __metadata("design:type", Array)
], Market.prototype, "orders", void 0);
__decorate([
    typeorm_1.OneToOne(() => address_1.Address, address => address.market),
    typeorm_1.JoinColumn(),
    __metadata("design:type", address_1.Address)
], Market.prototype, "address", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Market.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Market.prototype, "updated_at", void 0);
Market = __decorate([
    typeorm_1.Entity()
], Market);
exports.Market = Market;
