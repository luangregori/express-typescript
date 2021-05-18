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
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.get(['/healthcheck', '/mvbff/credential-management/healthcheck'], (req, res) => {
    return res.status(200).json({ status: 'UP' });
});
router.use("/users", user_router_1.default);
router.use(auth_1.default);
router.use("/category", category_router_1.default);
router.use("/product", product_router_1.default);
router.use("/home", home_router_1.default);
exports.default = router;
