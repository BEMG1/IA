from datetime import datetime


FechaHora = datetime.now()

FechaActual = FechaHora.date()
HoraActual = FechaHora.time()

base_conocimientos = {
    "hola": ["Hola:)", "Hola ¿cómo te puedo ayudar?"],
    "como estas": ["Estoy bien, gracias", "Todo bien, tú que tal?"],
    "nombre": ["Soy tu mejor amigo :p", "Puedes llamarme bIA"],
    "hora actual": ["Funcion en proceso"] ,
    #[f"La hora es: {HoraActual.strftime('%H:%M:%S')}" ],
    "fecha actual": [f"la fecha del dia de hoy es:  {FechaActual.strftime('%d-%m-%Y')}"],
    "suma": "Una operación aritmética que consiste en agregar dos o más números para obtener su total.",
    "resta": "Una operación aritmética que consiste en substraer un número de otro para obtener la diferencia.",
    "multiplicacion": "Una operación aritmética que consiste en repetir la adición de un número consigo mismo varias veces.",
    "division": "Una operación aritmética que consiste en repartir un número en partes iguales o en encontrar cuántas veces un número cabe en otro.",
    "potenciacion": "Una operación aritmética que consiste en elevar un número a una potencia específica.",
    "radicacion": "Una operación aritmética inversa a la potenciación que consiste en encontrar la raíz de un número.",
}