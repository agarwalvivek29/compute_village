import { MongoClient} from "mongodb";
import dotenv from 'dotenv'
dotenv.config();
const client=new MongoClient('mongodb+srv://a34mritunjaysingh:zp8WLlLD94ocYfYZ@cluster0.geqrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/fuss');
export const connectDB = async () => {
  try {
    await client.connect();
    console.log('Database connected successfully');
  } catch (error:any) {
    console.error('Database connection failed:', error.message);
    process.exit(1); 
  }
};


export const getCollection=(collectionName:string)=>{
  if (!client.db("fuss")) throw new Error("Database not connected");
  return client.db("fuss").collection(collectionName);
}

