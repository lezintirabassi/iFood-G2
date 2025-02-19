from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db_connection

app = Flask(__name__)
CORS(app)  # Permitir requisições do React

# Criar cliente
@app.route('/create', methods=['POST'])
def create_cliente():
    data = request.json
    nome, email, cpf = data['nome'], data['email'], data['cpf']

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO clientes (nome, email, cpf) VALUES (%s, %s, %s)", (nome, email, cpf))
        conn.commit()
        return jsonify({"message": "Cliente criado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()

# Ler todos os clientes
@app.route('/clientes', methods=['GET'])
def get_clientes():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM clientes")
    clientes = cursor.fetchall()

    cursor.close()
    conn.close()
    return jsonify(clientes)

# Atualizar cliente
@app.route('/update/<cpf>', methods=['PUT'])
def update_cliente(cpf):
    data = request.json
    nome, email = data['nome'], data['email']

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("UPDATE clientes SET nome=%s, email=%s WHERE cpf=%s", (nome, email, cpf))
    conn.commit()

    cursor.close()
    conn.close()
    return jsonify({"message": "Cliente atualizado com sucesso!"})

# Deletar cliente
@app.route('/delete/<cpf>', methods=['DELETE'])
def delete_cliente(cpf):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM clientes WHERE cpf=%s", (cpf,))
    conn.commit()

    cursor.close()
    conn.close()
    return jsonify({"message": "Cliente deletado com sucesso!"})

if __name__ == '__main__':
    app.run(debug=True)
