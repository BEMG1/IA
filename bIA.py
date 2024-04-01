from flask import Flask, render_template, request
from unidecode import unidecode
import random
import json
app = Flask(__name__)

def normalizarCadena(pregunta):

    pregunta =  unidecode(pregunta.lower().strip())

    pregunta = ''.join(c for c in pregunta if  c.isalnum() or c.isspace())

    return pregunta 

with open ('baseConocimientos.json', 'r', encoding='utf=8') as archivo:
    base_conocimientos = json.load(archivo)

def obtener_respuesta(pregunta, idioma='es'):

    preguntaNormalizada = normalizarCadena(pregunta)

    if not preguntaNormalizada:
        if idioma == 'es':
            return "Ups... Creo que enviaste una pregunta vacia"
        elif idioma == 'en':
            return "Oops... I think you sent an empty question"
        else:
            return "idioma no soportado"
    
    else:
        if idioma == 'es':
            respuesta_base = "Lo siento, no tengo respuesta a tu pregunta, Prueba con otra pregunta"
        elif idioma == 'en':
            respuesta_base = "Sorry, I don't have an answer to your question. Try asking something else"
        else:
            return "Idioma no soportado"


        base = base_conocimientos.get(idioma, {})

        respuesta = base.get(preguntaNormalizada, None)

        if respuesta is None:
            for clave in base:
                if preguntaNormalizada in normalizarCadena(clave):
                    respuesta = base[clave]
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
    idioma = request.form['idioma'] 
    print('El idioma seleccionado es:', idioma)  
    respuesta = obtener_respuesta(pregunta, idioma)
    return respuesta



@app.route('/ajustes')
def ajustes():
    return render_template('ajustes.html')

if __name__ == "__main__":
    app.run(debug=True)

   