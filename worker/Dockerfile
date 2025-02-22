FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

ENV MONGO_URI "mongodb+srv://a34mritunjaysingh:zp8WLlLD94ocYfYZ@cluster0.geqrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
ENV MONGO_DB "default"

COPY . .

CMD ["python", "main.py"]