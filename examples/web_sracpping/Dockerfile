# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.9-slim

ENV PYTHONDONTWRITEBYTECODE=1

ENV PYTHONUNBUFFERED=1

RUN pip install requests beautifulsoup4 pymongo python-dotenv
COPY main.py .

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
CMD ["python", "main.py"]