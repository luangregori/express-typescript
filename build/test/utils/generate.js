"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommentPayload = exports.generateCommentsData = exports.generateCommentData = exports.generatePostPayload = exports.generatePostsData = exports.generatePostData = exports.generateUserPayload = exports.generateUsersData = exports.generateUserData = void 0;
const faker_1 = __importDefault(require("faker"));
const models_1 = require("../../src/models");
function generateUserData(overide = {}) {
    return Object.assign({ id: faker_1.default.random.number(), firstName: faker_1.default.name.firstName(), lastName: faker_1.default.name.lastName(), email: faker_1.default.internet.email(), posts: [], comments: [], createdAt: new Date(), updatedAt: new Date() }, overide);
}
exports.generateUserData = generateUserData;
function generateUsersData(n = 1) {
    return Array.from({
        length: n
    }, (_, i) => {
        return generateUserData();
    });
}
exports.generateUsersData = generateUsersData;
function generateUserPayload() {
    return {
        firstName: faker_1.default.name.firstName(),
        lastName: faker_1.default.name.lastName(),
        email: faker_1.default.internet.email(),
    };
}
exports.generateUserPayload = generateUserPayload;
function generatePostData(overide = {}) {
    return Object.assign({ id: faker_1.default.random.number(), title: faker_1.default.lorem.sentence(), content: faker_1.default.lorem.paragraph(), userId: faker_1.default.random.number(), comments: [], user: new models_1.User(), createdAt: new Date(), updatedAt: new Date() }, overide);
}
exports.generatePostData = generatePostData;
function generatePostsData(n = 1, overide = {}) {
    return Array.from({
        length: n
    }, (_, i) => {
        return generatePostData(overide);
    });
}
exports.generatePostsData = generatePostsData;
function generatePostPayload() {
    return {
        title: faker_1.default.lorem.sentence(),
        content: faker_1.default.lorem.paragraph(),
        userId: faker_1.default.random.number(),
    };
}
exports.generatePostPayload = generatePostPayload;
function generateCommentData(overide = {}) {
    return Object.assign({ id: faker_1.default.random.number(), content: faker_1.default.lorem.paragraph(), userId: faker_1.default.random.number(), user: new models_1.User(), postId: faker_1.default.random.number(), post: new models_1.Post(), createdAt: new Date(), updatedAt: new Date() }, overide);
}
exports.generateCommentData = generateCommentData;
function generateCommentsData(n = 1, overide = {}) {
    return Array.from({
        length: n
    }, (_, i) => {
        return generateCommentData(overide);
    });
}
exports.generateCommentsData = generateCommentsData;
function generateCommentPayload() {
    return {
        content: faker_1.default.lorem.paragraph(),
        userId: faker_1.default.random.number(),
        postId: faker_1.default.random.number(),
    };
}
exports.generateCommentPayload = generateCommentPayload;
