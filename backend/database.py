import mysql.connector
from mysql.connector import Error

def get_db_connection():
    try:
        conexao = mysql.connector.connect(
            host='db-teste2.c1uka62e40t7.sa-east-1.rds.amazonaws.com',
            user='admin',
            password='teste-impacta',
            database='teste_crud'
        )

        if conexao.is_connected():
            print("✅ Conexão com AWS RDS estabelecida com sucesso!")
            return conexao

    except Error as e:
        print(f"❌ Erro ao conectar com AWS RDS: {e}")
        return None

if __name__ == "__main__":
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT DATABASE();")
        db_atual = cursor.fetchone()
        print(f"📚 Banco conectado: {db_atual[0]}")
        conn.close()
