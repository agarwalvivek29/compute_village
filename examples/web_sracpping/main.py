import os
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from datetime import datetime
import sys
import json

def scrape_url(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching URL: {e}")
        sys.exit(1)
        
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Remove script and style elements
    for script in soup(["script", "style"]):
        script.decompose()
        
    # Get text content with spaces
    text = soup.get_text(separator=' ', strip=True)
    return text

def upload_to_mongodb(content, url, mongodb_uri):
    try:
        client = MongoClient(mongodb_uri)
        db = client["lottery-game"]
        collection = db['Cluster0']
        
        document = {
            "url": url,
            "content": content,
            "timestamp": datetime.now()
        }
        
        result = collection.insert_one(document)
        print(f"Successfully uploaded content to MongoDB. Document ID: {result.inserted_id}")
        
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        sys.exit(1)

def main():    
    mongodb_uri = os.getenv('MONGODB_URI')
    urls  = json.loads(os.getenv('URL'))
    if not mongodb_uri:
        print("MONGODB_URI environment variable not found")
        sys.exit(1)
    for url in urls:
        scraped_content = scrape_url(url)
        upload_to_mongodb(scraped_content, url, mongodb_uri)

if __name__ == "__main__":
    main()