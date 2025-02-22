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
exports.getFieldValues = exports.getCollections = exports.updateData = exports.insertData = void 0;
const index_1 = require("../config/index");
const mongodb_1 = require("mongodb");
(0, index_1.connectDB)();
const insertData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { collection, data } = req.body;
        if (!collection || !data) {
            return res.status(400).json({ error: "collection and data are required" });
        }
        const formattedData = typeof data === "string" ? { value: data } : data;
        const col = (0, index_1.getCollection)(collection);
        console.log("collection :", col);
        const result = yield col.insertOne(formattedData);
        const insertedDoc = yield col.findOne({ _id: result.insertedId });
        res.status(201).json({ message: "Document inserted", collection: collection, data: insertedDoc });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error while inserting");
    }
});
exports.insertData = insertData;
const updateData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { collection, data } = req.body;
        const { id } = req.params;
        if (!collection || !data || !id) {
            return res.status(400).json({ error: "collection and data are required" });
        }
        const col = (0, index_1.getCollection)(collection);
        const result = yield col.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: data });
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "document not found" });
        }
        const updatedDoc = yield col.findOne({ _id: new mongodb_1.ObjectId(id) });
        res.json({ message: "document updated successfully", collection: collection, data: updatedDoc });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error while updateing");
    }
});
exports.updateData = updateData;
const getCollections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = new mongodb_1.MongoClient(process.env.DB_URI || "");
        yield client.connect();
        const db = client.db("fuss");
        const collections = yield db.listCollections().toArray();
        res.json({
            message: "collections retrieved successfully",
            collections: collections.map(col => col.name),
        });
        yield client.close();
    }
    catch (error) {
        console.log("Error while get collection");
        res.status(500).json({ error: error.message });
    }
});
exports.getCollections = getCollections;
const getFieldValues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { collection, field } = req.params;
        if (!collection || !field) {
            return res.status(400).json({ error: "Collection and field are required" });
        }
        const col = (0, index_1.getCollection)(collection);
        const values = yield col.distinct(field);
        res.json({
            message: "Field values retrieved successfully",
            collection: collection,
            field: field,
            values: values
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error while fetching field values");
    }
});
exports.getFieldValues = getFieldValues;
