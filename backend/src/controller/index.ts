import { getCollection,connectDB } from "../config/index";
import { MongoClient, ObjectId } from "mongodb";
connectDB()
export const insertData=async(req:any,res:any)=>{
   try{
    const {collection,data}=req.body;
    if(!collection || !data){
        return res.status(400).json({ error: "collection and data are required"});
      }
      const formattedData = typeof data === "string" ? { value: data } : data;
      const col=getCollection(collection);
      console.log("collection :",col);
      const result=await col.insertOne(formattedData);
      const insertedDoc = await col.findOne({ _id: result.insertedId });
      res.status(201).json({ message: "Document inserted",collection:collection,data:insertedDoc});
     
   }catch(error:any){
    res.status(500).json({ error: error.message });
    console.log("Error while inserting")
   }
}


export const updateData=async(req:any,res:any)=>{
    try{
     const {collection,data}=req.body;
     const {id}=req.params;
     if(!collection || !data || !id){
         return res.status(400).json({ error: "collection and data are required"});
       }
       const col=getCollection(collection);
       const result = await col.updateOne({_id:new ObjectId(id)}, {$set:data});
       if(result.matchedCount===0){
        return res.status(404).json({error:"document not found"});
      }
      const updatedDoc = await col.findOne({ _id: new ObjectId(id) });
      res.json({ message: "document updated successfully" ,collection:collection,data:updatedDoc});
       
      
    }catch(error:any){
        res.status(500).json({ error: error.message });
        console.log("Error while updateing")
    }
 }
 


 export const getCollections=async(req:any,res:any)=>{
      try{
        const client = new MongoClient(process.env.DB_URI || "");
        await client.connect();
    
       const db = client.db("fuss");
       const collections = await db.listCollections().toArray();
       res.json({
        message: "collections retrieved successfully",
        collections: collections.map(col=>col.name),
      });
      await client.close();

      }catch(error:any){
        console.log("Error while get collection")
        res.status(500).json({error:error.message})
      }
 }



 export const getFieldValues=async(req:any,res:any)=>{
    try{
      const{collection,field}=req.params;
  
      if (!collection || !field) {
        return res.status(400).json({ error: "Collection and field are required" });
      }
  
      const col = getCollection(collection);
      const values = await col.distinct(field);
  
      res.json({
        message: "Field values retrieved successfully",
        collection: collection,
        field: field,
        values: values
      });
  
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      console.log("Error while fetching field values");
    }
  };
  