"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badRequestError = void 0;
exports.badRequestError = (error) => {
    return Promise.reject({ error });
};
