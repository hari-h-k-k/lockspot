FROM python:3.8

WORKDIR /usr/app/src/backend

RUN pip install pymysql flask flask-cors flask-jwt-extended mysql-connector-python cryptography

COPY main.py ./

EXPOSE 5000

CMD python main.py
