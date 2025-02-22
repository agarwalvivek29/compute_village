import express from "express";
import {insertData,updateData,getCollections,getFieldValues}from "../controller/index";

const router = express.Router();

router.post("/insertdata",insertData);      
router.post("/updatedata/:id",updateData);  

router.get('/collection',getCollections)
router.get("/collections/:collection/field/:field/values", getFieldValues);

export default router;
