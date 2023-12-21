FROM python:3.8-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

CMD ["python", "main.py"] 