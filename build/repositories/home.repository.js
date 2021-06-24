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
exports.getPromos = void 0;
const typeorm_1 = require("typeorm");
exports.getPromos = () => __awaiter(void 0, void 0, void 0, function* () {
    const entityManager = typeorm_1.getManager();
    const someQuery = yield entityManager.query(`
  SELECT p.id as product_id, ho.type_product, p.name, p.description, p.url_photo, pm.price, pm.old_price, pm.discount
    FROM home ho
   	JOIN product p ON ho.product_id = p.id
    JOIN product_market pm ON ho.product_market_id = pm.id;`);
    return someQuery;
});
