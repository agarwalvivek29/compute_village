import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

class DatabaseManager:
    def __init__(self):
        self.client = MongoClient(os.getenv('MONGO_URI', 'mongodb://localhost:27017/'))
        self.db = self.client[os.getenv('MONGO_DB', 'default')]

    def insert(self, collection, data, _id=None):
        collection = self.db[collection]
        return collection.update_one({"_id": _id}, {"$set": data}, upsert=True)
        
    def create(self, collection, data):
        collection = self.db[collection]
        return collection.insert_one(data)

    def get(self, collection, _id):
        collection = self.db[collection]
        return collection.find_one({"_id": _id})
    
    def get_all(self, collection):
        collection = self.db[collection]
        return collection.find()