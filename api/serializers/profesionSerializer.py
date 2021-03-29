# Importar el paquete serailizer
from rest_framework import serializers
# Importar los modelos
from api.models import Profesion




""" SERIALIZER Profesion """
""" Enviar mis datos del backend al frontend """
class ProfesionSerializer(serializers.ModelSerializer):
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Profesion
        # Especificar los atributos que se desea serializar 
        fields =('__all__')



""" SERIALIZER Profesion """
""" Para verificar la informacion que me envia el frontend """
class ProfesionRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Profesion
        # Especificar los atributos que se desea serializar 
        fields =(
            'nombre_profesion',
        )