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
exports.ProductMarket = exports.Product = void 0;
const typeorm_1 = require("typeorm");
const category_1 = require("./category");
const home_1 = require("./home");
const market_1 = require("./market");
const order_1 = require("./order");
let Product = class Product {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "url_photo", void 0);
__decorate([
    typeorm_1.ManyToOne(_type => category_1.Category, (category) => category.products),
    __metadata("design:type", Array)
], Product.prototype, "category", void 0);
__decorate([
    typeorm_1.OneToMany(_type => home_1.Home, (home) => home.product_market),
    __metadata("design:type", Array)
], Product.prototype, "home", void 0);
__decorate([
    typeorm_1.OneToMany(() => ProductMarket, (productMarket) => productMarket.product),
    __metadata("design:type", Array)
], Product.prototype, "productMarket", void 0);
__decorate([
    typeorm_1.ManyToMany(() => order_1.Order, order => order.products),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Product.prototype, "orders", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "updated_at", void 0);
Product = __decorate([
    typeorm_1.Entity()
], Product);
exports.Product = Product;
let ProductMarket = class ProductMarket {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ProductMarket.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "double precision" }),
    __metadata("design:type", Number)
], ProductMarket.prototype, "price", void 0);
__decorate([
    typeorm_1.Column({ type: "double precision", nullable: true }),
    __metadata("design:type", Number)
], ProductMarket.prototype, "old_price", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], ProductMarket.prototype, "discount", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Product, (product) => product.productMarket),
    __metadata("design:type", Product)
], ProductMarket.prototype, "product", void 0);
__decorate([
    typeorm_1.ManyToOne(() => market_1.Market, (market) => market.productMarket),
    __metadata("design:type", market_1.Market)
], ProductMarket.prototype, "market", void 0);
ProductMarket = __decorate([
    typeorm_1.Entity()
], ProductMarket);
exports.ProductMarket = ProductMarket;
