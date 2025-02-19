import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='g25SIAN',
        database='bd_iFood'
    )
