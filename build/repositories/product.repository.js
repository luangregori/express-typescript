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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsInACategory = exports.getOnlyPriceByMarket = exports.getOnlyProductbyId = exports.getProduct = void 0;
const typeorm_1 = require("typeorm");
const models_1 = require("../models");
exports.getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Product);
    const entityManager = typeorm_1.getManager();
    const someQuery = yield entityManager.query(`
  SELECT m.id, m.name, pm.price, pm.old_price, pm.discount
    FROM product_market pm
    JOIN market m ON pm.market_id = m.id
    WHERE pm.product_id = ${id};`);
    const product = yield repository
        .createQueryBuilder("product")
        .where(`product.id = ${id}`)
        .getOne();
    if (!product)
        return null;
    product.productMarket = someQuery;
    return product;
});
exports.getOnlyProductbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Product);
    return repository.findOneOrFail(id);
});
exports.getOnlyPriceByMarket = (productId, marketId) => __awaiter(void 0, void 0, void 0, function* () {
    const entityManager = typeorm_1.getManager();
    const someQuery = yield entityManager.query(`
  SELECT pm.price
    FROM product_market pm
   	JOIN product p ON pm.product_id = p.id
    WHERE pm.product_id = ${productId} AND pm.market_id = ${marketId};`);
    return someQuery[0].price;
});
exports.getProductsInACategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const repository = getRepository(Product);
    // return repository
    //   .createQueryBuilder("product")
    //   .innerJoin("product.category", "category")
    //   .where(`category.id = ${id}`)
    //   .getMany();
    const entityManager = typeorm_1.getManager();
    const someQuery = yield entityManager.query(`
  SELECT p.id as id, p.name, p.description, p.url_photo, t.price, pm.old_price, pm.discount
    FROM (
      SELECT product_id, MIN(price) as price
      FROM product_market
      GROUP BY product_id
      ) t 
    JOIN product_market pm ON pm.product_id = t.product_id AND t.price = pm.price
    JOIN product p ON pm.product_id = p.id
    WHERE p.category_id = ${id};`);
    return someQuery;
});
