import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from utils import calcular_comissoes
import json

app = Flask(__name__)
CORS(app) 

@app.route('/calcular', methods=['POST'])
def calcular():
    data = request.json
    property_id = data['property_id']
    mes = data['mes']

    base_path = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_path, 'data', 'reservas.json')

    with open(file_path) as f:
        reservas = json.load(f)

    resultado = calcular_comissoes(reservas, property_id, mes)
    return jsonify(resultado)

if __name__ == '__main__':
    app.run(debug=True)
