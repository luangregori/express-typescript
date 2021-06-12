"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./user.router"));
const category_router_1 = __importDefault(require("./category.router"));
const product_router_1 = __importDefault(require("./product.router"));
const home_router_1 = __importDefault(require("./home.router"));
const order_router_1 = __importDefault(require("./order.router"));
const address_router_1 = __importDefault(require("./address.router"));
const card_router_1 = __importDefault(require("./card.router"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.get('/healthcheck', (req, res) => {
    return res.status(200).json({ status: 'UP' });
});
router.use("/users", user_router_1.default);
router.use(auth_1.default);
router.use("/category", category_router_1.default);
router.use("/product", product_router_1.default);
router.use("/home", home_router_1.default);
router.use("/order", order_router_1.default);
router.use("/order", order_router_1.default);
router.use("/address", address_router_1.default);
router.use("/card", card_router_1.default);
exports.default = router;
