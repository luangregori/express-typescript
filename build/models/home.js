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
exports.Home = void 0;
const typeorm_1 = require("typeorm");
const product_1 = require("./product");
let Home = class Home {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Home.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Home.prototype, "type_product", void 0);
__decorate([
    typeorm_1.ManyToOne(_type => product_1.Product, (product) => product.id),
    __metadata("design:type", Array)
], Home.prototype, "product", void 0);
__decorate([
    typeorm_1.ManyToOne(_type => product_1.ProductMarket, (product_market) => product_market.id),
    __metadata("design:type", Array)
], Home.prototype, "product_market", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Home.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Home.prototype, "updated_at", void 0);
Home = __decorate([
    typeorm_1.Entity()
], Home);
exports.Home = Home;
