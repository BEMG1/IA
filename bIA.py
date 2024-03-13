from flask import Flask, render_template, request
from unidecode import unidecode


import random
from baseConocimientos import base_conocimientos
app = Flask(__name__)

def normalizarCadena(pregunta):

    pregunta =  unidecode(pregunta.lower().strip())

    pregunta = ''.join(c for c in pregunta if  c.isalnum() or c.isspace())

    return pregunta 


def obtener_respuesta(pregunta):

    preguntaNormalizada = normalizarCadena(pregunta)

    if not preguntaNormalizada: 
        return "Ups... Creo que enviaste una pregunta vacia"
    
    else:

        respuesta_base = "Lo siento, no tengo respuesta a tu pregunta, Prueba con otra pregunta"

        respuesta = base_conocimientos.get(preguntaNormalizada, None)

        if respuesta is None:
            for clave in base_conocimientos:
                if preguntaNormalizada in normalizarCadena(clave):
                    respuesta = base_conocimientos[clave]
                    break

        if respuesta is None:
            respuesta = respuesta_base  

        if isinstance(respuesta, list):
            
            return random.choice(respuesta)
        else:
            return respuesta
    
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/consultar_respuesta', methods=['POST'])
def consultar_respuesta():
    pregunta = request.form['pregunta']
    respuesta = obtener_respuesta(pregunta)
    print("Respuesta obtenida:", respuesta)  # Agregar esta línea para depurar
    return respuesta


@app.route('/ajustes')
def ajustes():
    return render_template('ajustes.html')

if __name__ == "__main__":
    app.run(debug=True)

   