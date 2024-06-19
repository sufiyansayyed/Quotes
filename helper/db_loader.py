# File - db_loader.py
# Usage - Loads quotes.json in quotes table in postgresql DB
# Required file - db_conn_details.py which will have DB details

import json
import psycopg2
import db_conn_details as dbconn

quote='quote'
author='author'
topic='topic'
date = 'date'
i=1

print('Loading file...')
quotes = open('quotes.json','r')
print('File loaded ...')

print('Connecting to DB ...')
conn = psycopg2.connect(
    database=dbconn.DATABASE,
    user=dbconn.USER,
    password=dbconn.PASSWORD,
    host=dbconn.HOST,
    port=dbconn.port
)
cursor = conn.cursor()
print('Connected to DB ...')

print('Insering data (Start)...')
while True:
    line = quotes.readline()
    if not line:
        break
    line_json = json.loads(line)
    sql = "INSERT INTO QUOTES (quote,author,topic,quote_date) VALUES (%s,%s,%s,%s);"
    cursor.execute(sql,(line_json[quote],line_json[author],line_json[topic],line_json[date]))
    i+=1
conn.commit()  
print('Insering data (Complete)...')

conn.close()
print('Exiting...')