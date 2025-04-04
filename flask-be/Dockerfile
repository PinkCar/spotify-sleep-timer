FROM python:3-alpine3.15
WORKDIR /flask-app
COPY . /flask-app

RUN pip install -r requirements.txt

EXPOSE 5001

CMD python ./sleep-timer.py

