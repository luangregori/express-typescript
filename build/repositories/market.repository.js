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
exports.getProductsInAMarket = exports.getAllMarkets = exports.getOnlyMarketbyId = void 0;
const typeorm_1 = require("typeorm");
const models_1 = require("../models");
exports.getOnlyMarketbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Market);
    return repository.findOneOrFail(id);
});
exports.getAllMarkets = () => __awaiter(void 0, void 0, void 0, function* () {
    const repository = typeorm_1.getRepository(models_1.Market);
    const market = yield repository
        .createQueryBuilder("market")
        .leftJoinAndSelect("market.address", "address")
        .getMany();
    return market;
});
exports.getProductsInAMarket = (marketId) => __awaiter(void 0, void 0, void 0, function* () {
    const entityManager = typeorm_1.getManager();
    const someQuery = yield entityManager.query(`
    SELECT p.id as id, p.name, p.description, p.url_photo, pm.price, pm.old_price, pm.discount
      FROM product_market pm
      JOIN product p ON pm.product_id = p.id
      WHERE pm.market_id = ${marketId};`);
    return someQuery;
});
