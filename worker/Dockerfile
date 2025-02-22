FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

ENV MONGO_URI "mongodb+srv://a34mritunjaysingh:zp8WLlLD94ocYfYZ@cluster0.geqrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
ENV MONGO_DB "default"
ENV RABBITMQ_HOST "34.168.29.26"
ENV RABBITMQ_PORT "8000"

COPY . .

CMD ["python", "main.py"]