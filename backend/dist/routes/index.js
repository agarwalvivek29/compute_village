"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../controller/index");
const router = express_1.default.Router();
router.post("/insertdata", index_1.insertData);
router.post("/updatedata/:id", index_1.updateData);
router.get('/collection', index_1.getCollections);
router.get("/collections/:collection/field/:field/values", index_1.getFieldValues);
exports.default = router;
